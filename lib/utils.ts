import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    + '-esya-depolama';
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function calculatePrice(
  volume: number,
  duration: number,
  services: string[],
  prices: any
): number {
  let basePrice = prices.base[volume] * duration;

  if (duration >= 12) {
    basePrice *= 0.80;
  } else if (duration >= 6) {
    basePrice *= 0.85;
  } else if (duration >= 3) {
    basePrice *= 0.90;
  }

  let extraCost = 0;
  services.forEach(service => {
    if (prices.services[service]) {
      extraCost += prices.services[service];
    }
  });

  return basePrice + extraCost;
}
