'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateServices(formData: FormData) {
  await requireAuth();

  const services = {
    services: [
      {
        id: 'esya-depolama',
        title: formData.get('title_esya') as string,
        description: formData.get('desc_esya') as string,
        icon: formData.get('icon_esya') as string,
      },
      {
        id: 'ofis-depolama',
        title: formData.get('title_ofis') as string,
        description: formData.get('desc_ofis') as string,
        icon: formData.get('icon_ofis') as string,
      },
      {
        id: 'arsiv-depolama',
        title: formData.get('title_arsiv') as string,
        description: formData.get('desc_arsiv') as string,
        icon: formData.get('icon_arsiv') as string,
      },
      {
        id: 'arac-depolama',
        title: formData.get('title_arac') as string,
        description: formData.get('desc_arac') as string,
        icon: formData.get('icon_arac') as string,
      },
    ],
  };

  const filePath = join(process.cwd(), 'data', 'services.json');
  await writeFile(filePath, JSON.stringify(services, null, 2), 'utf-8');

  revalidatePath('/admin/hizmetler');
  revalidatePath('/');

  return { success: true, message: 'Hizmetler başarıyla güncellendi' };
}

export async function getServices() {
  const filePath = join(process.cwd(), 'data', 'services.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
