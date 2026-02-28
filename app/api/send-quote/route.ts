import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';
import path from 'path';
import { generatePriceQuoteEmailTemplate, generatePriceQuoteSubject } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const { fullName, phoneNumber, apartmentType, duration, totalPrice } = await request.json();

    // SMTP ayarlarını JSON'dan oku
    const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const settings = JSON.parse(fileContents);
    const smtpSettings = settings.smtpSettings || {};

    // SMTP transporter oluştur
    const transporter = nodemailer.createTransport({
      host: smtpSettings.host || process.env.SMTP_HOST,
      port: parseInt(smtpSettings.port || process.env.SMTP_PORT || '587'),
      secure: smtpSettings.secure || false,
      auth: {
        user: smtpSettings.user || process.env.SMTP_USER,
        pass: smtpSettings.pass || process.env.SMTP_PASS,
      },
    });

    // Email template oluştur
    const emailHtml = generatePriceQuoteEmailTemplate({
      fullName,
      phoneNumber,
      apartmentType,
      duration,
      totalPrice,
    });

    // Site config'den site adını al
    const siteConfigPath = path.join(process.cwd(), 'data', 'site-config.json');
    const siteConfigContents = await fs.readFile(siteConfigPath, 'utf8');
    const siteConfig = JSON.parse(siteConfigContents);
    const siteName = siteConfig.site?.name || 'Eşya Depolama';

    // Mail içeriği
    const mailOptions = {
      from: `"${siteName}" <${smtpSettings.from || process.env.SMTP_FROM || smtpSettings.user}>`,
      to: smtpSettings.to || process.env.SMTP_TO,
      subject: generatePriceQuoteSubject(fullName),
      html: emailHtml,
    };

    // Mail gönder
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Mail başarıyla gönderildi' });
  } catch (error) {
    console.error('Mail gönderme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Mail gönderilemedi' },
      { status: 500 }
    );
  }
}
