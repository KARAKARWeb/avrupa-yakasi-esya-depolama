import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json();
    
    const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
    
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'Ayarlar başarıyla kaydedildi' });
  } catch (error) {
    console.error('Homepage settings kaydetme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Kaydetme sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
