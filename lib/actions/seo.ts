'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateSEO(formData: FormData) {
  await requireAuth();

  const seo = {
    defaultTitle: formData.get('defaultTitle') as string,
    titleTemplate: formData.get('titleTemplate') as string,
    defaultDescription: formData.get('defaultDescription') as string,
    keywords: (formData.get('keywords') as string).split(',').map(k => k.trim()),
    ogImage: formData.get('ogImage') as string,
    twitterHandle: formData.get('twitterHandle') as string,
    googleSiteVerification: formData.get('googleSiteVerification') as string,
    googleAnalyticsId: formData.get('googleAnalyticsId') as string,
    googleTagManagerId: formData.get('googleTagManagerId') as string,
  };

  const filePath = join(process.cwd(), 'data', 'seo-config.json');
  await writeFile(filePath, JSON.stringify(seo, null, 2), 'utf-8');

  revalidatePath('/admin/seo');
  revalidatePath('/');

  return { success: true, message: 'SEO ayarları başarıyla güncellendi' };
}

export async function getSEO() {
  const filePath = join(process.cwd(), 'data', 'seo-config.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
