# SEO Stratejisi

Eşya depolama web sitesi için kapsamlı SEO stratejisi ve implementasyon detayları.

## 🎯 SEO Hedefleri

- ✅ Google'da ilk sayfada yer alma
- ✅ "eşya depolama [bölge]" aramalarında 1. sıra
- ✅ Rich snippets (fiyat, yıldız, stok)
- ✅ Local SEO dominasyonu
- ✅ Core Web Vitals: Yeşil (tüm metrikler)
- ✅ PSI Skoru: %100 (mobil + masaüstü)

## 📊 Anahtar Kelime Stratejisi

### Ana Anahtar Kelimeler

**Genel:**
- eşya depolama
- self storage
- eşya deposu
- depo kiralama
- güvenli eşya depolama

**Yerel (25 bölge için):**
- [bölge] eşya depolama
- [bölge] self storage
- [bölge] eşya deposu
- [bölge]'de eşya depolama
- [bölge] güvenli depolama

**Long-tail:**
- uygun fiyatlı eşya depolama [bölge]
- klimalı eşya deposu [bölge]
- sigortalı eşya depolama [bölge]
- 7/24 eşya depolama [bölge]

### LSI Keywords (Latent Semantic Indexing)

- depo kiralama
- eşya saklama
- güvenli depolama
- klimalı depo
- sigortalı depolama
- taşıma hizmeti
- paketleme hizmeti
- arşiv depolama
- ofis eşyası depolama
- ev eşyası depolama

## 🏗️ On-Page SEO

### Meta Tags (Dinamik)

**Ana Sayfa:**
```typescript
export const metadata = {
  title: `${siteName} - Güvenli ve Uygun Fiyatlı Self Storage`,
  description: `İstanbul ${region}'da güvenli eşya depolama hizmeti. 7/24 kamera, klimalı depolar, uygun fiyatlar. Hemen teklif alın!`,
  keywords: [
    'eşya depolama',
    'self storage',
    `${region} eşya depolama`,
    'güvenli depolama',
    'uygun fiyat',
  ],
  openGraph: {
    title: `${siteName} - Güvenli Eşya Depolama`,
    description: '...',
    url: `https://${domain}`,
    siteName: siteName,
    images: [
      {
        url: `https://${domain}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName}`,
    description: '...',
    images: [`https://${domain}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `https://${domain}`,
  },
};
```

**Bölge Sayfası:**
```typescript
export async function generateMetadata({ params }) {
  const region = await getRegion(params.slug);
  
  return {
    title: `${region.name} - ${siteName}`,
    description: `${region.name}'de profesyonel eşya depolama hizmeti. Sigortalı, güvenli, uygun fiyatlı. Hemen teklif alın!`,
    keywords: [
      `${region.name} eşya depolama`,
      `${region.name} self storage`,
      `${region.name} eşya deposu`,
    ],
    openGraph: {
      title: `${region.name} Eşya Depolama`,
      description: '...',
      url: `https://${domain}/${region.slug}`,
    },
    alternates: {
      canonical: `https://${domain}/${region.slug}`,
    },
  };
}
```

### Başlık Hiyerarşisi

**Ana Sayfa:**
```html
<h1>Avrupa Yakası Eşya Depolama - Güvenli ve Uygun Fiyatlı</h1>
<h2>Hizmetlerimiz</h2>
<h2>Neden Biz?</h2>
<h2>Fiyatlarımız</h2>
<h2>Sık Sorulan Sorular</h2>
<h2>Müşteri Yorumları</h2>
```

**Bölge Sayfası:**
```html
<h1>Beşiktaş Eşya Depolama</h1>
<h2>Beşiktaş'ta Eşya Depolama Hizmeti</h2>
<h2>Fiyatlarımız</h2>
<h2>Sık Sorulan Sorular</h2>
<h2>Müşteri Yorumları</h2>
```

### İçerik Optimizasyonu

**Minimum İçerik Uzunluğu:**
- Ana sayfa: 1500+ kelime
- Bölge sayfaları: 800-1000 kelime
- Hakkımızda: 500+ kelime
- Fiyatlar: 600+ kelime

**İçerik Yapısı:**
- Kısa paragraflar (3-4 cümle)
- Bullet points
- Alt başlıklar (H2, H3)
- Kalın vurgular
- İç linkler

**Keyword Density:**
- Ana keyword: %1-2
- LSI keywords: Doğal kullanım
- Keyword stuffing YOK

## 🌐 Schema.org Structured Data

### Organization Schema (Tüm Sayfalarda)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Avrupa Yakası Eşya Depolama",
  "url": "https://avrupayakasiesyadepolama.com",
  "logo": "https://avrupayakasiesyadepolama.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-532-138-4979",
    "contactType": "customer service",
    "areaServed": "TR",
    "availableLanguage": "Turkish"
  },
  "sameAs": [
    "https://www.facebook.com/...",
    "https://www.instagram.com/...",
    "https://twitter.com/..."
  ]
}
```

### LocalBusiness Schema (Ana Sayfa + Bölgeler)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SelfStorage"],
  "name": "Avrupa Yakası Eşya Depolama",
  "image": "https://avrupayakasiesyadepolama.com/depo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "İstanbul",
    "addressRegion": "İstanbul",
    "postalCode": "34000",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.0082",
    "longitude": "28.9784"
  },
  "url": "https://avrupayakasiesyadepolama.com",
  "telephone": "+90-532-138-4979",
  "priceRange": "₺₺",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:00",
      "closes": "15:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "paymentAccepted": "Nakit, Havale/EFT, Kredi Kartı"
}
```

### Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Eşya Depolama",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Avrupa Yakası Eşya Depolama"
  },
  "areaServed": {
    "@type": "City",
    "name": "İstanbul"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Eşya Depolama Hizmetleri",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ev Eşyası Depolama"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ofis Eşyası Depolama"
        }
      }
    ]
  }
}
```

### FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Eşya depolama fiyatları nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eşya depolama fiyatlarımız 1m³ için aylık 450₺'den başlamaktadır..."
      }
    }
  ]
}
```

### AggregateOffer Schema (Fiyatlar Sayfası)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Eşya Depolama Hizmeti",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "450",
    "highPrice": "5000",
    "priceCurrency": "TRY",
    "availability": "https://schema.org/InStock",
    "offerCount": "12"
  }
}
```

### Review Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Avrupa Yakası Eşya Depolama"
  },
  "author": {
    "@type": "Person",
    "name": "Ahmet Y."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Çok memnun kaldım, güvenli ve temiz..."
}
```

### BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
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
      "name": "Beşiktaş Eşya Depolama",
      "item": "https://avrupayakasiesyadepolama.com/besiktas-esya-depolama"
    }
  ]
}
```

### WebSite Schema (Arama Kutusu)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://avrupayakasiesyadepolama.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://avrupayakasiesyadepolama.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

## 🗺️ Sitemap.xml

**Otomatik Oluşturma:**
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const regions = await getRegions();
  
  return [
    {
      url: 'https://avrupayakasiesyadepolama.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://avrupayakasiesyadepolama.com/hakkimizda',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://avrupayakasiesyadepolama.com/fiyatlarimiz',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://avrupayakasiesyadepolama.com/iletisim',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...regions.map(region => ({
      url: `https://avrupayakasiesyadepolama.com/${region.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
  ];
}
```

## 🤖 Robots.txt

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://avrupayakasiesyadepolama.com/sitemap.xml
```

## 🔗 Internal Linking Stratejisi

### Ana Sayfa → Bölgeler
```tsx
<Link href="/besiktas-esya-depolama">
  Beşiktaş Eşya Depolama
</Link>
```

### Bölgeler → Ana Sayfa
```tsx
<Breadcrumb>
  <Link href="/">Ana Sayfa</Link>
  <span>/</span>
  <span>Beşiktaş Eşya Depolama</span>
</Breadcrumb>
```

### Footer → Tüm Bölgeler
```tsx
<footer>
  <h3>Hizmet Bölgelerimiz</h3>
  <ul>
    {regions.map(region => (
      <li key={region.slug}>
        <Link href={`/${region.slug}`}>
          {region.name}
        </Link>
      </li>
    ))}
  </ul>
</footer>
```

### Contextual Links
```tsx
<p>
  İstanbul'un tüm bölgelerinde{' '}
  <Link href="/fiyatlarimiz">uygun fiyatlı</Link>{' '}
  eşya depolama hizmeti sunuyoruz.
</p>
```

## 📈 Local SEO

### Google Business Profile

**Optimizasyon:**
- ✅ Tam profil bilgileri
- ✅ Kategori: Self Storage Facility
- ✅ Çalışma saatleri
- ✅ Fotoğraflar (10+ adet)
- ✅ Yorumlar (aktif yanıtlama)
- ✅ Sorular & Cevaplar
- ✅ Gönderiler (haftalık)

**NAP Consistency:**
- Name: Ayrupa Yakası Eşya Depolama
- Address: [Tam adres]
- Phone: +90 532 138 4979

Her yerde aynı format!

### Yerel Dizinler

**Kayıt Olunacak:**
- Google Business Profile
- Yandex Haritalar
- Foursquare
- Yelp
- Facebook Places
- Sahibinden.com
- Hürriyet Emlak
- Zingat

### Yerel İçerik

**Her bölge sayfasında:**
- Bölge hakkında bilgi
- Yerel landmark'lar
- Ulaşım bilgileri
- Bölgeye özel SSS
- Bölgeye özel yorumlar

## ⚡ Core Web Vitals

### LCP (Largest Contentful Paint) < 2.5s

**Optimizasyonlar:**
- Hero image: `priority` prop
- WebP format
- Responsive images
- CDN (Vercel Edge)
- Preload critical resources

```tsx
<Image
  src="/hero.jpg"
  alt="..."
  width={1200}
  height={600}
  priority // LCP için kritik
  quality={85}
/>
```

### FID (First Input Delay) < 100ms

**Optimizasyonlar:**
- Minimal JavaScript
- Code splitting
- Defer non-critical JS
- No blocking scripts

```tsx
<Script
  src="..."
  strategy="afterInteractive" // veya "lazyOnload"
/>
```

### CLS (Cumulative Layout Shift) < 0.1

**Optimizasyonlar:**
- Tüm görsellerde width/height
- Font display: swap
- Reserved space for ads/embeds
- No dynamic content injection

```tsx
<Image
  src="..."
  width={800} // CLS için gerekli
  height={600} // CLS için gerekli
  alt="..."
/>
```

## 🚀 Sayfa Hızı Optimizasyonu

### Image Optimization

- ✅ WebP format (otomatik)
- ✅ Lazy loading (otomatik)
- ✅ Responsive images
- ✅ Compression (quality: 80-85)
- ✅ CDN delivery

### Font Optimization

```typescript
// Self-hosted font
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // FOUT önleme
  preload: true,
});
```

### CSS Optimization

- ✅ Tailwind JIT
- ✅ PurgeCSS (otomatik)
- ✅ Critical CSS inline
- ✅ No unused CSS

### JavaScript Optimization

- ✅ Code splitting (otomatik)
- ✅ Tree shaking
- ✅ Minification
- ✅ Compression (gzip/brotli)

### Caching

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 📊 Analytics & Tracking

### Google Analytics 4

**Events:**
- page_view (otomatik)
- form_submit (teklif formu)
- phone_click (telefon butonu)
- whatsapp_click (WhatsApp butonu)
- price_calculate (fiyat hesaplama)

### Google Search Console

**Monitoring:**
- Indexing status
- Search queries
- Click-through rate
- Core Web Vitals
- Mobile usability

### Google Tag Manager

**Tags:**
- GA4
- Facebook Pixel (opsiyonel)
- Google Ads Conversion (opsiyonel)

## 🎯 Conversion Optimization (SEO İçin)

### Trust Signals

- ✅ Müşteri yorumları (5 yıldız)
- ✅ "1000+ mutlu müşteri"
- ✅ "15 yıllık tecrübe"
- ✅ "Sigortalı depolama"
- ✅ SSL sertifikası
- ✅ İletişim bilgileri (footer)

### Clear CTA

- ✅ "Hemen Teklif Al" (turuncu, belirgin)
- ✅ "Fiyat Hesapla" (sticky)
- ✅ Telefon numarası (header + sticky)
- ✅ WhatsApp butonu (sticky)

### Social Proof

- ✅ Yorumlar (schema ile)
- ✅ Yıldız puanı (SERP'te görünür)
- ✅ Müşteri sayısı
- ✅ Sosyal medya linkleri

## 📱 Mobile SEO

### Mobile-First Indexing

- ✅ Responsive design
- ✅ Touch-friendly (min 44px)
- ✅ Hızlı yükleme (< 3s)
- ✅ No intrusive interstitials
- ✅ Readable font sizes (16px+)

### Mobile Usability

- ✅ Hamburger menü
- ✅ Sticky CTA
- ✅ Easy forms
- ✅ Click-to-call
- ✅ WhatsApp integration

## 🔍 Rich Snippets

### Fiyat Snippet

```json
{
  "@type": "Offer",
  "price": "450",
  "priceCurrency": "TRY",
  "availability": "InStock"
}
```

**SERP'te:**
```
Avrupa Yakası Eşya Depolama
₺450/ay'dan başlayan fiyatlar - Stokta var
```

### Yıldız Snippet

```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "127"
}
```

**SERP'te:**
```
Avrupa Yakası Eşya Depolama
⭐⭐⭐⭐⭐ 4.8 (127 yorum)
```

### SSS Snippet

```json
{
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

**SERP'te:**
Genişletilebilir SSS kutusu

## 📈 SEO Monitoring

### Haftalık Kontrol

- ✅ Google Search Console
- ✅ Indexing status
- ✅ Core Web Vitals
- ✅ Mobile usability

### Aylık Kontrol

- ✅ Keyword rankings
- ✅ Organic traffic
- ✅ Conversion rate
- ✅ Bounce rate
- ✅ Page speed

### Araçlar

- Google Search Console
- Google Analytics 4
- PageSpeed Insights
- Lighthouse
- Schema Markup Validator
- Mobile-Friendly Test

## 🎯 İlk 3 Ay Hedefleri

### Ay 1: Teknik SEO
- ✅ Tüm sayfalar indexlendi
- ✅ Schema.org implementasyonu
- ✅ Sitemap submit
- ✅ Core Web Vitals: Yeşil

### Ay 2: İçerik & Local SEO
- ✅ 25 bölge sayfası yayında
- ✅ Google Business Profile optimize
- ✅ İlk yorumlar eklendi
- ✅ Local directories kayıt

### Ay 3: Ranking & Optimization
- ✅ İlk sayfa (en az 5 keyword)
- ✅ Rich snippets görünüyor
- ✅ Organic traffic artışı
- ✅ Conversion optimization

## 🚀 Uzun Vadeli Strateji

### 6 Ay
- Top 3 (ana keywords)
- 100+ organic visitor/gün
- 50+ lead/ay

### 12 Ay
- #1 (çoğu keyword)
- 500+ organic visitor/gün
- 200+ lead/ay
- Domain authority: 30+

## ✅ SEO Checklist

### Teknik SEO
- [x] HTTPS
- [x] Mobile-friendly
- [x] Fast loading (< 3s)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Schema.org
- [x] Breadcrumbs
- [x] 404 page
- [x] Clean URLs

### On-Page SEO
- [x] Unique titles
- [x] Meta descriptions
- [x] H1 tags
- [x] Alt texts
- [x] Internal links
- [x] Keyword optimization
- [x] Content quality

### Off-Page SEO
- [x] Google Business Profile
- [x] Local directories
- [x] Social media
- [x] Reviews
- [x] Backlinks (opsiyonel)
