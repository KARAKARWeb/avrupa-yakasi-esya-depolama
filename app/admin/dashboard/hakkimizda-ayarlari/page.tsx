import { promises as fs } from 'fs';
import path from 'path';
import HakkimizdaAyarlariClient from './HakkimizdaAyarlariClient';

export const dynamic = 'force-dynamic';

export default async function HakkimizdaAyarlariPage() {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);

  return <HakkimizdaAyarlariClient initialSettings={settings.aboutUs} />;
}
