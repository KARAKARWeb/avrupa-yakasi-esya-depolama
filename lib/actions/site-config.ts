'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateSiteConfig(formData: FormData) {
  await requireAuth();

  const currentConfig = await getSiteConfig();

  const config = {
    site: {
      domain: formData.get('domain') as string || currentConfig.site.domain,
      name: formData.get('name') as string || currentConfig.site.name,
      title: formData.get('title') as string || currentConfig.site.title,
      description: formData.get('description') as string || currentConfig.site.description,
      keywords: currentConfig.site.keywords,
    },
    contact: {
      phone: formData.get('phone') as string || currentConfig.contact.phone,
      whatsapp: formData.get('whatsapp') as string || currentConfig.contact.whatsapp,
      email: formData.get('email') as string || currentConfig.contact.email,
      address: formData.get('address') as string || currentConfig.contact.address,
    },
    location: {
      city: formData.get('city') as string || currentConfig.location.city,
      region: formData.get('region') as string || currentConfig.location.region,
      lat: formData.get('lat') as string || currentConfig.location.lat,
      lng: formData.get('lng') as string || currentConfig.location.lng,
    },
    social: {
      facebook: formData.get('facebook') as string || currentConfig.social.facebook,
      instagram: formData.get('instagram') as string || currentConfig.social.instagram,
      twitter: formData.get('twitter') as string || currentConfig.social.twitter,
      linkedin: formData.get('linkedin') as string || currentConfig.social.linkedin,
    },
    business: currentConfig.business,
    hours: currentConfig.hours,
  };

  const filePath = join(process.cwd(), 'data', 'site-config.json');
  await writeFile(filePath, JSON.stringify(config, null, 2), 'utf-8');

  revalidatePath('/admin/site-ayarlari');
  revalidatePath('/');

  return { success: true, message: 'Site ayarları başarıyla güncellendi' };
}

export async function getSiteConfig() {
  const filePath = join(process.cwd(), 'data', 'site-config.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
