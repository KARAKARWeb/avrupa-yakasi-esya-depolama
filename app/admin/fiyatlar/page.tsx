import { promises as fs } from 'fs';
import path from 'path';
import FiyatlarClient from './FiyatlarClient';

export const dynamic = 'force-dynamic';

export default async function FiyatlarPage() {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);

  return <FiyatlarClient initialSettings={settings.priceCalculatorForm || {}} />;
}
