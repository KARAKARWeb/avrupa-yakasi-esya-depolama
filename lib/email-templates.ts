// Email Template Functions

interface PriceQuoteData {
  fullName: string;
  phoneNumber: string;
  apartmentType: string;
  duration: string;
  totalPrice: string;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
}

export function generatePriceQuoteEmailTemplate(data: PriceQuoteData): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yeni Fiyat Teklifi Talebi</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🎯 Yeni Fiyat Teklifi Talebi
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                ${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </td>
          </tr>

          <!-- Customer Info -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                  👤 Müşteri Bilgileri
                </h2>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #64748b; font-size: 14px; font-weight: 600; width: 140px;">Ad Soyad:</td>
                    <td style="color: #1e293b; font-size: 14px; font-weight: 500;">${data.fullName}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-size: 14px; font-weight: 600;">Telefon:</td>
                    <td style="color: #1e293b; font-size: 14px; font-weight: 500;">
                      <a href="tel:+90${data.phoneNumber}" style="color: #2563eb; text-decoration: none;">
                        0${data.phoneNumber}
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Request Details -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #78350f; font-size: 18px; font-weight: 600;">
                  📦 Talep Detayları
                </h2>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #92400e; font-size: 14px; font-weight: 600; width: 140px;">Daire Tipi:</td>
                    <td style="color: #78350f; font-size: 14px; font-weight: 500;">${data.apartmentType}</td>
                  </tr>
                  <tr>
                    <td style="color: #92400e; font-size: 14px; font-weight: 600;">Depolama Süresi:</td>
                    <td style="color: #78350f; font-size: 14px; font-weight: 500;">${data.duration}</td>
                  </tr>
                  <tr>
                    <td style="color: #92400e; font-size: 14px; font-weight: 600;">Toplam Fiyat:</td>
                    <td style="color: #f97316; font-size: 20px; font-weight: 700;">${data.totalPrice}</td>
                  </tr>
                </table>
              </div>

              <!-- Action Required -->
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                  ⚡ Hızlı İşlem Gerekli
                </p>
                <p style="margin: 10px 0 0 0; color: #1e40af; font-size: 13px; line-height: 1.6;">
                  Müşteri ile en kısa sürede iletişime geçiniz. WhatsApp veya telefon ile hızlı dönüş yapmanız önerilir.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Bu mail otomatik olarak gönderilmiştir.
              </p>
              <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 11px;">
                Eşya Depolama Yönetim Sistemi
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateContactFormEmailTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yeni İletişim Formu Mesajı</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ✉️ Yeni İletişim Formu Mesajı
              </h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 14px;">
                ${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #064e3b; font-size: 18px; font-weight: 600;">
                  👤 Gönderen Bilgileri
                </h2>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #047857; font-size: 14px; font-weight: 600; width: 100px;">Ad Soyad:</td>
                    <td style="color: #064e3b; font-size: 14px; font-weight: 500;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="color: #047857; font-size: 14px; font-weight: 600;">Telefon:</td>
                    <td style="color: #064e3b; font-size: 14px; font-weight: 500;">
                      <a href="tel:${data.phone}" style="color: #10b981; text-decoration: none;">
                        ${data.phone}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #047857; font-size: 14px; font-weight: 600;">E-posta:</td>
                    <td style="color: #064e3b; font-size: 14px; font-weight: 500;">
                      <a href="mailto:${data.email}" style="color: #10b981; text-decoration: none;">
                        ${data.email}
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              ${data.message ? `
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #78350f; font-size: 18px; font-weight: 600;">
                  💬 Mesaj İçeriği
                </h2>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fde68a;">
                  <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                  </p>
                </div>
              </div>
              ` : ''}

              <!-- Quick Actions -->
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                  🚀 Hızlı İşlemler
                </p>
                <div style="margin-top: 15px;">
                  <a href="tel:${data.phone}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-right: 10px; margin-bottom: 10px;">
                    📞 Ara
                  </a>
                  <a href="mailto:${data.email}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-bottom: 10px;">
                    ✉️ Mail Gönder
                  </a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Bu mail otomatik olarak gönderilmiştir.
              </p>
              <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 11px;">
                Eşya Depolama Yönetim Sistemi
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generatePriceQuoteSubject(fullName: string): string {
  return `🎯 Yeni Fiyat Teklifi Talebi - ${fullName}`;
}

export function generateContactFormSubject(name: string): string {
  return `✉️ Yeni İletişim Formu Mesajı - ${name}`;
}
