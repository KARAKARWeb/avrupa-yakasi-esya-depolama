'use server';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSMTP } from '@/lib/actions/smtp';
import { requireAuth } from '@/lib/auth';

export async function POST() {
  try {
    await requireAuth();
    
    const smtp = await getSMTP();

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.auth.user,
        pass: smtp.auth.pass,
      },
    });

    await transporter.sendMail({
      from: `"${smtp.from.name}" <${smtp.from.email}>`,
      to: smtp.to,
      subject: 'SMTP Test - Başarılı',
      html: `
        <h2>SMTP Ayarları Test Edildi</h2>
        <p>Bu email, SMTP ayarlarınızın doğru çalıştığını göstermektedir.</p>
        <p><strong>Host:</strong> ${smtp.host}</p>
        <p><strong>Port:</strong> ${smtp.port}</p>
        <p><strong>Kullanıcı:</strong> ${smtp.auth.user}</p>
        <p><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Test emaili başarıyla gönderildi!' 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: `SMTP hatası: ${error.message}` 
    }, { status: 500 });
  }
}
