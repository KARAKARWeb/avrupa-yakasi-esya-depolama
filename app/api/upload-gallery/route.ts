import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // Public/gallery klasörünü oluştur
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    if (!existsSync(galleryDir)) {
      await mkdir(galleryDir, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Benzersiz dosya adı oluştur
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const extension = file.name.split('.').pop();
      const filename = `gallery-${timestamp}-${randomString}.${extension}`;

      // Dosyayı kaydet
      const filepath = path.join(galleryDir, filename);
      await writeFile(filepath, buffer);

      // URL'i listeye ekle
      uploadedUrls.push(`/gallery/${filename}`);
    }

    return NextResponse.json({ 
      success: true, 
      images: uploadedUrls,
      message: `${uploadedUrls.length} resim başarıyla yüklendi` 
    });
  } catch (error) {
    console.error('Gallery upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
