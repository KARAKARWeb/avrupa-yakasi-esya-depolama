'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateSMTP(formData: FormData) {
  await requireAuth();

  const smtp = {
    host: formData.get('host') as string,
    port: Number(formData.get('port')),
    secure: formData.get('secure') === 'true',
    auth: {
      user: formData.get('user') as string,
      pass: formData.get('pass') as string,
    },
    from: {
      name: formData.get('fromName') as string,
      email: formData.get('fromEmail') as string,
    },
    to: formData.get('to') as string,
  };

  const filePath = join(process.cwd(), 'data', 'smtp-config.json');
  await writeFile(filePath, JSON.stringify(smtp, null, 2), 'utf-8');

  revalidatePath('/admin/smtp');

  return { success: true, message: 'SMTP ayarları başarıyla güncellendi' };
}

export async function getSMTP() {
  const filePath = join(process.cwd(), 'data', 'smtp-config.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
