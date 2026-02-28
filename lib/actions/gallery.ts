'use server';

import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addGalleryImage(formData: FormData) {
  await requireAuth();

  const gallery = await getGallery();
  
  const newImage = {
    id: `img-${Date.now()}`,
    url: formData.get('url') as string,
    alt: formData.get('alt') as string,
    category: formData.get('category') as string,
    order: gallery.images.length + 1,
  };

  gallery.images.push(newImage);

  const filePath = join(process.cwd(), 'data', 'gallery.json');
  await writeFile(filePath, JSON.stringify(gallery, null, 2), 'utf-8');

  revalidatePath('/admin/galeri');
  revalidatePath('/');

  return { success: true, message: 'Görsel başarıyla eklendi' };
}

export async function updateGalleryImage(formData: FormData) {
  await requireAuth();

  const id = formData.get('id') as string;
  const gallery = await getGallery();
  
  const imageIndex = gallery.images.findIndex((img: any) => img.id === id);
  
  if (imageIndex === -1) {
    return { success: false, message: 'Görsel bulunamadı' };
  }

  gallery.images[imageIndex] = {
    id,
    url: formData.get('url') as string,
    alt: formData.get('alt') as string,
    category: formData.get('category') as string,
    order: Number(formData.get('order')),
  };

  const filePath = join(process.cwd(), 'data', 'gallery.json');
  await writeFile(filePath, JSON.stringify(gallery, null, 2), 'utf-8');

  revalidatePath('/admin/galeri');
  revalidatePath('/');

  return { success: true, message: 'Görsel başarıyla güncellendi' };
}

export async function deleteGalleryImage(id: string) {
  await requireAuth();

  const gallery = await getGallery();
  gallery.images = gallery.images.filter((img: any) => img.id !== id);

  const filePath = join(process.cwd(), 'data', 'gallery.json');
  await writeFile(filePath, JSON.stringify(gallery, null, 2), 'utf-8');

  revalidatePath('/admin/galeri');
  revalidatePath('/');

  return { success: true, message: 'Görsel başarıyla silindi' };
}

export async function getGallery() {
  const filePath = join(process.cwd(), 'data', 'gallery.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
