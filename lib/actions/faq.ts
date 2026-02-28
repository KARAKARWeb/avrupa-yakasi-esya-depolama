'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addFAQ(formData: FormData) {
  await requireAuth();

  const faqs = await getFAQs();
  
  const newFAQ = {
    id: `faq-${Date.now()}`,
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    category: formData.get('category') as string,
    order: faqs.faqs.length + 1,
  };

  faqs.faqs.push(newFAQ);

  const filePath = join(process.cwd(), 'data', 'faq.json');
  await writeFile(filePath, JSON.stringify(faqs, null, 2), 'utf-8');

  revalidatePath('/admin/sss');
  revalidatePath('/');

  return { success: true, message: 'SSS başarıyla eklendi' };
}

export async function updateFAQ(formData: FormData) {
  await requireAuth();

  const id = formData.get('id') as string;
  const faqs = await getFAQs();
  
  const faqIndex = faqs.faqs.findIndex((f: any) => f.id === id);
  
  if (faqIndex === -1) {
    return { success: false, message: 'SSS bulunamadı' };
  }

  faqs.faqs[faqIndex] = {
    id,
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    category: formData.get('category') as string,
    order: Number(formData.get('order')),
  };

  const filePath = join(process.cwd(), 'data', 'faq.json');
  await writeFile(filePath, JSON.stringify(faqs, null, 2), 'utf-8');

  revalidatePath('/admin/sss');
  revalidatePath('/');

  return { success: true, message: 'SSS başarıyla güncellendi' };
}

export async function deleteFAQ(id: string) {
  await requireAuth();

  const faqs = await getFAQs();
  faqs.faqs = faqs.faqs.filter((f: any) => f.id !== id);

  const filePath = join(process.cwd(), 'data', 'faq.json');
  await writeFile(filePath, JSON.stringify(faqs, null, 2), 'utf-8');

  revalidatePath('/admin/sss');
  revalidatePath('/');

  return { success: true, message: 'SSS başarıyla silindi' };
}

export async function getFAQs() {
  const filePath = join(process.cwd(), 'data', 'faq.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
