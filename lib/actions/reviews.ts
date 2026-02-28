'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addReview(formData: FormData) {
  await requireAuth();

  const reviews = await getReviews();
  
  const newReview = {
    id: `review-${Date.now()}`,
    name: formData.get('name') as string,
    rating: Number(formData.get('rating')),
    comment: formData.get('comment') as string,
    date: new Date().toISOString().split('T')[0],
    verified: formData.get('verified') === 'true',
  };

  reviews.reviews.push(newReview);

  const filePath = join(process.cwd(), 'data', 'reviews.json');
  await writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf-8');

  revalidatePath('/admin/yorumlar');
  revalidatePath('/');

  return { success: true, message: 'Yorum başarıyla eklendi' };
}

export async function updateReview(formData: FormData) {
  await requireAuth();

  const id = formData.get('id') as string;
  const reviews = await getReviews();
  
  const reviewIndex = reviews.reviews.findIndex((r: any) => r.id === id);
  
  if (reviewIndex === -1) {
    return { success: false, message: 'Yorum bulunamadı' };
  }

  reviews.reviews[reviewIndex] = {
    id,
    name: formData.get('name') as string,
    rating: Number(formData.get('rating')),
    comment: formData.get('comment') as string,
    date: formData.get('date') as string,
    verified: formData.get('verified') === 'true',
  };

  const filePath = join(process.cwd(), 'data', 'reviews.json');
  await writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf-8');

  revalidatePath('/admin/yorumlar');
  revalidatePath('/');

  return { success: true, message: 'Yorum başarıyla güncellendi' };
}

export async function deleteReview(id: string) {
  await requireAuth();

  const reviews = await getReviews();
  reviews.reviews = reviews.reviews.filter((r: any) => r.id !== id);

  const filePath = join(process.cwd(), 'data', 'reviews.json');
  await writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf-8');

  revalidatePath('/admin/yorumlar');
  revalidatePath('/');

  return { success: true, message: 'Yorum başarıyla silindi' };
}

export async function getReviews() {
  const filePath = join(process.cwd(), 'data', 'reviews.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
