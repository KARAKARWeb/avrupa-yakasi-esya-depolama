'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateRegion(formData: FormData) {
  await requireAuth();

  const slug = formData.get('slug') as string;
  const regions = await getRegions();
  
  const regionIndex = regions.regions.findIndex((r: any) => r.slug === slug);
  
  if (regionIndex === -1) {
    return { success: false, message: 'Bölge bulunamadı' };
  }

  regions.regions[regionIndex] = {
    slug,
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    metaDescription: formData.get('metaDescription') as string,
    keywords: (formData.get('keywords') as string).split(',').map(k => k.trim()),
    content: {
      intro: formData.get('intro') as string,
      features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
      advantages: (formData.get('advantages') as string).split('\n').filter(a => a.trim()),
    },
  };

  const filePath = join(process.cwd(), 'data', 'regions.json');
  await writeFile(filePath, JSON.stringify(regions, null, 2), 'utf-8');

  revalidatePath('/admin/bolgeler');
  revalidatePath(`/${slug}`);

  return { success: true, message: 'Bölge başarıyla güncellendi' };
}

export async function getRegions() {
  const filePath = join(process.cwd(), 'data', 'regions.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function getRegion(slug: string) {
  const regions = await getRegions();
  return regions.regions.find((r: any) => r.slug === slug);
}
