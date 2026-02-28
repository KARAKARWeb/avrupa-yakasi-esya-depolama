import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const pageHeaders = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    const settings = JSON.parse(fileContents);
    
    settings.pageHeaders = pageHeaders;
    
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving page headers:', error);
    return NextResponse.json({ error: 'Failed to save page headers' }, { status: 500 });
  }
}
