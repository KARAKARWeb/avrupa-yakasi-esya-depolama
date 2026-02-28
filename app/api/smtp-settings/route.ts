import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const smtpSettings = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    const settings = JSON.parse(fileContents);
    
    settings.smtpSettings = smtpSettings;
    
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving SMTP settings:', error);
    return NextResponse.json({ error: 'Failed to save SMTP settings' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const settings = JSON.parse(fileContents);
    
    return NextResponse.json(settings.smtpSettings || {});
  } catch (error) {
    console.error('Error reading SMTP settings:', error);
    return NextResponse.json({ error: 'Failed to read SMTP settings' }, { status: 500 });
  }
}
