import { promises as fs } from 'fs';
import path from 'path';
import SmtpClient from './SmtpClient';

export const dynamic = 'force-dynamic';

export default async function SMTPPage() {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);

  return <SmtpClient initialSettings={settings.smtpSettings || {}} />;
}
