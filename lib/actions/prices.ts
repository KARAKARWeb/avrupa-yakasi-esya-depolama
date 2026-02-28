'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updatePrices(formData: FormData) {
  await requireAuth();

  const prices = {
    basePrice: Number(formData.get('basePrice')),
    pricePerM2: Number(formData.get('pricePerM2')),
    minPrice: Number(formData.get('minPrice')),
    sizes: [
      {
        id: '5m2',
        name: '5 m²',
        size: 5,
        price: Number(formData.get('price_5m2')),
        description: formData.get('desc_5m2') as string,
      },
      {
        id: '10m2',
        name: '10 m²',
        size: 10,
        price: Number(formData.get('price_10m2')),
        description: formData.get('desc_10m2') as string,
      },
      {
        id: '15m2',
        name: '15 m²',
        size: 15,
        price: Number(formData.get('price_15m2')),
        description: formData.get('desc_15m2') as string,
      },
      {
        id: '20m2',
        name: '20 m²',
        size: 20,
        price: Number(formData.get('price_20m2')),
        description: formData.get('desc_20m2') as string,
      },
      {
        id: '25m2',
        name: '25 m²',
        size: 25,
        price: Number(formData.get('price_25m2')),
        description: formData.get('desc_25m2') as string,
      },
    ],
    discounts: [
      {
        months: 3,
        percentage: Number(formData.get('discount_3')),
      },
      {
        months: 6,
        percentage: Number(formData.get('discount_6')),
      },
      {
        months: 12,
        percentage: Number(formData.get('discount_12')),
      },
    ],
  };

  const filePath = join(process.cwd(), 'data', 'prices.json');
  await writeFile(filePath, JSON.stringify(prices, null, 2), 'utf-8');

  revalidatePath('/admin/fiyatlar');
  revalidatePath('/');
  revalidatePath('/fiyatlarimiz');

  return { success: true, message: 'Fiyatlar başarıyla güncellendi' };
}

export async function getPrices() {
  const filePath = join(process.cwd(), 'data', 'prices.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
