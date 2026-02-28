import { promises as fs } from 'fs';
import path from 'path';
import BaslikAyarlariClient from './BaslikAyarlariClient';

export const dynamic = 'force-dynamic';

export default async function BaslikAyarlariPage() {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);

  return <BaslikAyarlariClient initialSettings={settings.pageHeaders || {}} />;
}
