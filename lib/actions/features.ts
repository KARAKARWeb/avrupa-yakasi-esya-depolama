'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateFeatures(formData: FormData) {
  await requireAuth();

  const features = {
    features: [
      {
        id: 'guvenlik',
        title: formData.get('title_guvenlik') as string,
        description: formData.get('desc_guvenlik') as string,
        icon: formData.get('icon_guvenlik') as string,
      },
      {
        id: 'esnek-sure',
        title: formData.get('title_esnek') as string,
        description: formData.get('desc_esnek') as string,
        icon: formData.get('icon_esnek') as string,
      },
      {
        id: 'uygun-fiyat',
        title: formData.get('title_uygun') as string,
        description: formData.get('desc_uygun') as string,
        icon: formData.get('icon_uygun') as string,
      },
      {
        id: 'kolay-erisim',
        title: formData.get('title_kolay') as string,
        description: formData.get('desc_kolay') as string,
        icon: formData.get('icon_kolay') as string,
      },
    ],
  };

  const filePath = join(process.cwd(), 'data', 'features.json');
  await writeFile(filePath, JSON.stringify(features, null, 2), 'utf-8');

  revalidatePath('/admin/neden-biz');
  revalidatePath('/');

  return { success: true, message: 'Özellikler başarıyla güncellendi' };
}

export async function getFeatures() {
  const filePath = join(process.cwd(), 'data', 'features.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
