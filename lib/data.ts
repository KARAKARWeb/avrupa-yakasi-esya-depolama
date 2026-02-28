import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export async function getSiteConfig() {
  const data = await fs.readFile(path.join(dataDir, 'site-config.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getPrices() {
  const data = await fs.readFile(path.join(dataDir, 'prices.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getServices() {
  const data = await fs.readFile(path.join(dataDir, 'services.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getFeatures() {
  const data = await fs.readFile(path.join(dataDir, 'features.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getRegions() {
  const data = await fs.readFile(path.join(dataDir, 'regions.json'), 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.regions || [];
}

export async function getRegion(slug: string) {
  const regions = await getRegions();
  return regions.find((r: any) => r.slug === slug);
}

export async function getFAQ() {
  const data = await fs.readFile(path.join(dataDir, 'faq.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getReviews() {
  const data = await fs.readFile(path.join(dataDir, 'reviews.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getGallery() {
  const data = await fs.readFile(path.join(dataDir, 'gallery.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getSEOConfig() {
  const data = await fs.readFile(path.join(dataDir, 'seo-config.json'), 'utf-8');
  return JSON.parse(data);
}
