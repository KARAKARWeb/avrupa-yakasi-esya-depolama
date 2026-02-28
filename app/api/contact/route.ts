import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSiteConfig } from '@/lib/data';
import { rateLimit } from '@/lib/rate-limit';

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 500);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
  return phoneRegex.test(phone);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    if (!rateLimit(ip, 3, 300000)) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderdiniz. Lütfen 5 dakika sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    let { name, phone, email, volume, duration, message } = body;

    if (!name || !phone || !email || !volume || !duration) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurunuz' },
        { status: 400 }
      );
    }

    name = sanitizeInput(name);
    phone = sanitizeInput(phone);
    email = sanitizeInput(email);
    message = message ? sanitizeInput(message) : '';

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Geçerli bir telefon numarası giriniz' },
        { status: 400 }
      );
    }

    if (volume < 1 || volume > 1000) {
      return NextResponse.json(
        { error: 'Geçerli bir metreküp değeri giriniz' },
        { status: 400 }
      );
    }

    if (duration < 1 || duration > 120) {
      return NextResponse.json(
        { error: 'Geçerli bir süre giriniz' },
        { status: 400 }
      );
    }

    const config = await getSiteConfig();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.yandex.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || config.contact.email,
        pass: process.env.SMTP_PASS || '',
      },
    });

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066CC; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .info-box { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Teşekkür Ederiz!</h1>
          </div>
          <div class="content">
            <p>Sayın ${name},</p>
            <p>Eşya depolama teklif talebiniz tarafımıza ulaşmıştır. En kısa sürede size dönüş yapacağız.</p>
            <div class="info-box">
              <p><strong>Talep Detayları:</strong></p>
              <ul>
                <li>Metreküp: ${volume}m³</li>
                <li>Süre: ${duration} ay</li>
                <li>Telefon: ${phone}</li>
                <li>Email: ${email}</li>
              </ul>
            </div>
            <p>Acil durumlar için bizi arayabilirsiniz:</p>
            <p><strong>Telefon:</strong> ${config.contact.phone}</p>
            <p><strong>WhatsApp:</strong> ${config.contact.whatsapp}</p>
          </div>
          <div class="footer">
            <p>${config.site.name}</p>
            <p>https://${config.site.domain}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif;">
        <h2>Yeni Teklif Talebi</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Metreküp:</strong> ${volume}m³</p>
        <p><strong>Süre:</strong> ${duration} ay</p>
        <p><strong>Mesaj:</strong> ${message || 'Yok'}</p>
        <p><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${config.site.name}" <${config.contact.email}>`,
      to: email,
      subject: 'Teklif Talebiniz Alındı',
      html: customerEmailHtml,
    });

    await transporter.sendMail({
      from: `"${config.site.name}" <${config.contact.email}>`,
      to: config.contact.email,
      subject: `Yeni Teklif Talebi - ${name}`,
      html: adminEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi' },
      { status: 500 }
    );
  }
}
