# Özellikler

Eşya depolama web sitesinin tüm özellikleri detaylı açıklamalarıyla.

## 🎯 Ana Özellikler

### 1. Fiyat Hesaplama Formu

**Konum:** Ana sayfa (Hero sağ), Bölge sayfaları (Hero sağ)

**Amaç:** Kullanıcıların anlık fiyat hesaplaması yapabilmesi

**Form Alanları:**
- **Metreküp (m³):** Dropdown
  - Seçenekler: 1, 2, 3, 5, 10, 20, 30, 50, 100+
  - Placeholder: "Kaç m³?"
  
- **Süre:** Dropdown
  - Seçenekler: 1 ay, 2 ay, 3 ay, 4 ay, 5 ay, 6 ay, 7 ay, 8 ay, 9 ay, 10 ay, 11 ay, 12 ay, 1 yıl
  - Placeholder: "Ne kadar süre?"
  
- **Ek Hizmetler:** Checkboxlar
  - ☐ Taşıma Hizmeti
  - ☐ Montaj/Demontaj
  - ☐ Ambalaj Malzemesi
  - ☐ Klimalı Depo
  - ☐ Sigorta

**Hesaplama Mantığı:**
```typescript
function calculatePrice(volume: number, duration: number, services: string[], prices: PriceData) {
  // Base fiyat
  let basePrice = prices.base[volume] * duration;
  
  // İndirim (süreye göre)
  if (duration >= 12) {
    basePrice *= 0.80; // %20 indirim
  } else if (duration >= 6) {
    basePrice *= 0.85; // %15 indirim
  } else if (duration >= 3) {
    basePrice *= 0.90; // %10 indirim
  }
  
  // Ek hizmetler
  let extraCost = 0;
  services.forEach(service => {
    extraCost += prices.services[service];
  });
  
  return basePrice + extraCost;
}
```

**Sonuç Gösterimi:**
```
┌─────────────────────────────┐
│ Toplam Fiyat                │
│ 4.500₺                      │
│                             │
│ Detaylar:                   │
│ • 10m³ × 3 ay: 4.050₺      │
│ • Taşıma: 300₺             │
│ • Sigorta: 150₺            │
│                             │
│ [Hemen Teklif Al]          │
└─────────────────────────────┘
```

**Validasyon:**
- m³ seçilmeli
- Süre seçilmeli
- Minimum 1m³, maksimum 100m³

**CTA:**
- "Hemen Teklif Al" butonu → Teklif formuna scroll

---

### 2. Teklif Formu

**Konum:** Ana sayfa (alt), İletişim sayfası, Bölge sayfaları (alt)

**Amaç:** Kullanıcılardan teklif talebi almak, SMTP ile email göndermek

**Form Alanları:**
```typescript
interface ContactFormData {
  name: string;        // Ad Soyad
  phone: string;       // Telefon
  email: string;       // Email
  volume: number;      // m³
  duration: number;    // Süre (ay)
  message?: string;    // Mesaj (opsiyonel)
}
```

**Validasyon:**
```typescript
const schema = z.object({
  name: z.string().min(2, 'En az 2 karakter'),
  phone: z.string().regex(/^0\d{10}$/, 'Geçersiz telefon numarası'),
  email: z.string().email('Geçersiz email adresi'),
  volume: z.number().min(1).max(100),
  duration: z.number().min(1).max(12),
  message: z.string().optional(),
});
```

**Submit İşlemi:**
1. Form validasyonu
2. API'ye POST (`/api/contact`)
3. SMTP email gönderimi (Yandex)
4. Başarı mesajı
5. WhatsApp'a yönlendirme (opsiyonel)

**Email Template (Müşteriye):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0066CC; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f5f5f5; }
    .footer { padding: 20px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Teşekkür Ederiz!</h1>
    </div>
    <div class="content">
      <p>Sayın {{name}},</p>
      <p>Eşya depolama teklif talebiniz tarafımıza ulaşmıştır. En kısa sürede size dönüş yapacağız.</p>
      <p><strong>Talep Detayları:</strong></p>
      <ul>
        <li>Metreküp: {{volume}}m³</li>
        <li>Süre: {{duration}} ay</li>
        <li>Telefon: {{phone}}</li>
        <li>Email: {{email}}</li>
      </ul>
      <p>Acil durumlar için bizi arayabilirsiniz:</p>
      <p><strong>Telefon:</strong> +90 532 138 4979</p>
      <p><strong>WhatsApp:</strong> +90 532 138 4979</p>
    </div>
    <div class="footer">
      <p>Avrupa Yakası Eşya Depolama</p>
      <p>www.avrupayakasiesyadepolama.com</p>
    </div>
  </div>
</body>
</html>
```

**Email Template (Admin'e):**
```html
<!DOCTYPE html>
<html>
<body>
  <h2>Yeni Teklif Talebi</h2>
  <p><strong>Ad Soyad:</strong> {{name}}</p>
  <p><strong>Telefon:</strong> {{phone}}</p>
  <p><strong>Email:</strong> {{email}}</p>
  <p><strong>Metreküp:</strong> {{volume}}m³</p>
  <p><strong>Süre:</strong> {{duration}} ay</p>
  <p><strong>Mesaj:</strong> {{message}}</p>
  <p><strong>Tarih:</strong> {{date}}</p>
</body>
</html>
```

**Başarı Mesajı:**
```
✓ Talebiniz başarıyla gönderildi!
En kısa sürede size dönüş yapacağız.

[WhatsApp'tan Yaz] [Ana Sayfaya Dön]
```

**Hata Mesajı:**
```
✗ Mesaj gönderilemedi, lütfen tekrar deneyin.
Veya bizi direkt arayın: +90 532 138 4979
```

---

### 3. Hizmet Bölgeleri Sistemi

**Toplam:** 25 bölge (İstanbul Avrupa Yakası)

**Bölge Listesi:**
1. Arnavutköy
2. Avcılar
3. Bağcılar
4. Bahçelievler
5. Bakırköy
6. Başakşehir
7. Bayrampaşa
8. Beşiktaş
9. Beylikdüzü
10. Beyoğlu
11. Büyükçekmece
12. Çatalca
13. Esenler
14. Esenyurt
15. Eyüpsultan
16. Fatih
17. Gaziosmanpaşa
18. Güngören
19. Kâğıthane
20. Küçükçekmece
21. Sarıyer
22. Silivri
23. Sultangazi
24. Şişli
25. Zeytinburnu

**Slug Oluşturma (Otomatik):**
```typescript
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    + '-esya-depolama';
}

// Örnekler:
// "Beşiktaş" → "besiktas-esya-depolama"
// "Eyüpsultan" → "eyupsultan-esya-depolama"
// "Kâğıthane" → "kagithane-esya-depolama"
```

**Bölge Verisi (JSON):**
```json
{
  "id": "besiktas",
  "name": "Beşiktaş Eşya Depolama",
  "slug": "besiktas-esya-depolama",
  "description": "Beşiktaş'ta güvenli ve uygun fiyatlı eşya depolama hizmeti...",
  "content": "Beşiktaş, İstanbul'un en merkezi ilçelerinden biri...",
  "coordinates": {
    "lat": "41.0422",
    "lng": "29.0078"
  },
  "faq": [...],
  "reviews": [...]
}
```

**Bölge Sayfası Özellikleri:**
- Özel H1: "[Bölge] Eşya Depolama"
- Özel açıklama (2-3 paragraf)
- Fiyat hesaplama formu
- Fiyat tablosu (aynı)
- Harita (bölge merkezi)
- Bölgeye özel SSS (5-10 soru)
- Bölgeye özel yorumlar (5-6 adet)
- Teklif formu

---

### 4. SSS (Sık Sorulan Sorular)

**Genel SSS (Ana Sayfa):**
```json
[
  {
    "id": 1,
    "question": "Eşya depolama fiyatları nedir?",
    "answer": "Eşya depolama fiyatlarımız 1m³ için aylık 450₺'den başlamaktadır. Süreye göre indirimlerimiz mevcuttur."
  },
  {
    "id": 2,
    "question": "Depolarınız güvenli mi?",
    "answer": "Evet, tüm depolarımızda 7/24 kamera sistemi, alarm ve güvenlik görevlisi bulunmaktadır."
  },
  {
    "id": 3,
    "question": "Klimalı depo var mı?",
    "answer": "Evet, klimalı depo seçeneğimiz mevcuttur. Hassas eşyalarınız için önerilir."
  },
  {
    "id": 4,
    "question": "Sigorta yapıyor musunuz?",
    "answer": "Evet, tüm eşyalarınız için sigorta hizmeti sunuyoruz."
  },
  {
    "id": 5,
    "question": "Taşıma hizmeti veriyor musunuz?",
    "answer": "Evet, profesyonel ekibimizle taşıma hizmeti sunuyoruz."
  },
  {
    "id": 6,
    "question": "Minimum süre var mı?",
    "answer": "Minimum 1 ay süre ile depolama yapabilirsiniz."
  },
  {
    "id": 7,
    "question": "Eşyalarıma ne zaman erişebilirim?",
    "answer": "Çalışma saatlerimiz içinde (Pzt-Cuma 08:00-18:00) eşyalarınıza erişebilirsiniz."
  },
  {
    "id": 8,
    "question": "Ödeme nasıl yapılır?",
    "answer": "Nakit, Havale/EFT veya Kredi Kartı ile ödeme yapabilirsiniz."
  },
  {
    "id": 9,
    "question": "İptal politikanız nedir?",
    "answer": "1 ay önceden haber vererek sözleşmenizi iptal edebilirsiniz."
  },
  {
    "id": 10,
    "question": "Hangi bölgelere hizmet veriyorsunuz?",
    "answer": "İstanbul Avrupa Yakası'nın tüm ilçelerine hizmet veriyoruz."
  }
]
```

**Bölgeye Özel SSS:**
```json
[
  {
    "regionId": "besiktas",
    "questions": [
      {
        "id": 1,
        "question": "Beşiktaş'ta deponuz var mı?",
        "answer": "Evet, Beşiktaş'ta modern depolarımız bulunmaktadır."
      },
      {
        "id": 2,
        "question": "Beşiktaş'a taşıma yapıyor musunuz?",
        "answer": "Evet, Beşiktaş'a ücretsiz taşıma hizmeti sunuyoruz."
      }
    ]
  }
]
```

**UI Component (Accordion):**
```tsx
<Accordion>
  {faq.map((item) => (
    <AccordionItem key={item.id}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

**Schema.org:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Eşya depolama fiyatları nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eşya depolama fiyatlarımız..."
      }
    }
  ]
}
```

---

### 5. Yorum Sistemi

**Genel Yorumlar (Ana Sayfa):**
```json
[
  {
    "id": 1,
    "name": "Ahmet Y.",
    "rating": 5,
    "comment": "Çok memnun kaldım, güvenli ve temiz. Kesinlikle tavsiye ederim.",
    "date": "2024-01-15"
  },
  {
    "id": 2,
    "name": "Ayşe K.",
    "rating": 5,
    "comment": "Profesyonel ekip, uygun fiyatlar. Teşekkürler.",
    "date": "2024-01-10"
  }
]
```

**Bölgeye Özel Yorumlar:**
```json
[
  {
    "regionId": "besiktas",
    "reviews": [
      {
        "id": 1,
        "name": "Mehmet B.",
        "rating": 5,
        "comment": "Beşiktaş'ta eşya depolama için en iyi seçenek.",
        "date": "2024-01-20"
      }
    ]
  }
]
```

**UI Component:**
```tsx
<ReviewCard>
  <Stars rating={5} />
  <p className="italic">"{comment}"</p>
  <p className="text-sm text-gray-600">
    {name} - {formatDate(date)}
  </p>
</ReviewCard>
```

**Schema.org:**
```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "Ahmet Y." },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Çok memnun kaldım..."
}
```

**Aggregate Rating:**
```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "127",
  "bestRating": "5",
  "worstRating": "1"
}
```

---

### 6. Galeri Sistemi

**Konum:** Ana sayfa

**Görsel Sayısı:** 8 adet

**Kategoriler:** (Tek galeri, kategori yok)

**Görsel Verisi:**
```json
[
  {
    "id": 1,
    "src": "/uploads/gallery/depo-ici-1.jpg",
    "alt": "Eşya Depolama - Depo İçi Görünüm",
    "title": "Depo İçi"
  },
  {
    "id": 2,
    "src": "/uploads/gallery/guvenlik-1.jpg",
    "alt": "7/24 Güvenlik Kamera Sistemi",
    "title": "Güvenlik"
  }
]
```

**UI Component:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {gallery.map((image) => (
    <div key={image.id} className="relative aspect-square">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  ))}
</div>
```

**Lightbox:** Yok (basit grid)

**Admin Panel:**
- Drag & drop upload
- Max 5MB
- jpg, png, webp
- Otomatik WebP çevirme
- Otomatik resize (1200×800)

---

### 7. Harita Entegrasyonu

**Google Maps Embed:**

**Bölge Sayfaları (Bölge Merkezi):**
```tsx
<iframe
  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1str!2str!4v1234567890`}
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>
```

**Koordinatlar (Placeholder):**
```json
{
  "besiktas": { "lat": "41.0422", "lng": "29.0078" },
  "sisli": { "lat": "41.0602", "lng": "28.9887" },
  "kadikoy": { "lat": "40.9903", "lng": "29.0263" }
}
```

---

### 8. Sticky Butonlar

**Konum:** Sağ alt köşe (mobil + desktop)

**Butonlar:**
1. **Telefon:** `tel:+905321384979`
2. **WhatsApp:** `https://wa.me/905321384979?text=Merhaba`

**UI Component:**
```tsx
<div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
  <a
    href="tel:+905321384979"
    className="bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
  >
    <Phone className="w-6 h-6" />
  </a>
  <a
    href="https://wa.me/905321384979?text=Merhaba"
    className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
</div>
```

**Mobil:**
- Daha büyük butonlar (56×56px)
- Alt navbar'ın üstünde

---

### 9. Breadcrumb Navigation

**Tüm sayfalarda (Ana sayfa hariç):**

```tsx
<Breadcrumb
  items={[
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Beşiktaş Eşya Depolama' },
  ]}
/>
```

**Schema.org:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://avrupayakasiesyadepolama.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Beşiktaş Eşya Depolama"
    }
  ]
}
```

---

### 10. Analytics & Tracking

**Google Analytics 4:**
```tsx
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
```

**Google Tag Manager:**
```tsx
<Script id="gtm" strategy="afterInteractive">
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `}
</Script>
```

**Google Search Console:**
- Sitemap submit: `https://avrupayakasiesyadepolama.com/sitemap.xml`
- Domain verification

---

## 🎨 UI/UX Özellikleri

### 1. Responsive Design

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile-First:**
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### 2. Loading States

**Form Submit:**
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader className="animate-spin mr-2" />
      Gönderiliyor...
    </>
  ) : (
    'Gönder'
  )}
</Button>
```

### 3. Error Handling

**Form Errors:**
```tsx
{errors.phone && (
  <p className="text-red-500 text-sm mt-1">
    {errors.phone.message}
  </p>
)}
```

**API Errors:**
```tsx
{error && (
  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
    {error}
  </div>
)}
```

### 4. Success Messages

```tsx
{success && (
  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded">
    ✓ Talebiniz başarıyla gönderildi!
  </div>
)}
```

### 5. Smooth Scroll

```tsx
<Link href="#fiyatlar" className="scroll-smooth">
  Fiyatları Gör
</Link>
```

### 6. Hover Effects

```tsx
<Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  {/* Content */}
</Card>
```

---

## 🔐 Güvenlik Özellikleri

### 1. Form Validation (Zod)

```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(/^0\d{10}$/),
  email: z.string().email(),
  volume: z.number().min(1).max(100),
  duration: z.number().min(1).max(12),
  message: z.string().max(500).optional(),
});
```

### 2. Rate Limiting

```typescript
// API route
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // Max 5 request
};
```

### 3. CSRF Protection

Next.js built-in CSRF protection

### 4. XSS Protection

React otomatik escape

### 5. Environment Variables

```env
# .env.local (GIT'e eklenmez)
SMTP_USER=***
SMTP_PASS=***
ADMIN_PASSWORD_HASH=***
```

---

## 📊 Performans Özellikleri

### 1. Image Optimization

- Otomatik WebP
- Lazy loading
- Responsive images
- Blur placeholder

### 2. Code Splitting

- Otomatik route-based splitting
- Dynamic imports

### 3. Caching

- Static generation
- CDN (Vercel Edge)
- Browser caching

### 4. Minification

- CSS minification
- JS minification
- HTML minification

---

## ✅ Özellik Checklist

### Frontend
- [x] Fiyat hesaplama formu
- [x] Teklif formu
- [x] 25 bölge sayfası
- [x] SSS (genel + bölgeye özel)
- [x] Yorumlar (genel + bölgeye özel)
- [x] Galeri
- [x] Harita
- [x] Sticky butonlar (telefon, WhatsApp)
- [x] Breadcrumb
- [x] Responsive design
- [x] Loading states
- [x] Error handling

### Backend
- [x] SMTP email gönderimi
- [x] Form validasyonu
- [x] JSON-based data
- [x] Server-side rendering
- [x] API routes

### SEO
- [x] Dynamic metadata
- [x] Schema.org
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Open Graph
- [x] Rich snippets

### Analytics
- [x] Google Analytics 4
- [x] Google Tag Manager
- [x] Google Search Console

### Admin
- [x] Dashboard
- [x] JSON yönetimi
- [x] SMTP ayarları
- [x] Güvenlik (bcrypt)
