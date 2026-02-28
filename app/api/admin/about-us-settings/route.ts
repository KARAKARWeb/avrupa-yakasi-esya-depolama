import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const aboutUsSettings = await request.json();
    
    const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const settings = JSON.parse(fileContents);
    
    settings.aboutUs = aboutUsSettings;
    
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Hakkımızda ayarları kaydetme hatası:', error);
    return NextResponse.json({ error: 'Kaydetme başarısız' }, { status: 500 });
  }
}
