# Site Yapısı

Eşya depolama web sitesinin sayfa yapısı, routing ve component hiyerarşisi.

## 🗺️ Site Haritası

```
/                           → Ana Sayfa
├── /hakkimizda            → Hakkımızda
├── /fiyatlarimiz          → Fiyatlar & Paketler
├── /iletisim              → İletişim
├── /[slug]                → Dinamik Bölge Sayfaları (25 adet)
│   ├── /arnavutkoy-esya-depolama
│   ├── /avcilar-esya-depolama
│   ├── /bagcilar-esya-depolama
│   ├── /bahcelievler-esya-depolama
│   ├── /bakirkoy-esya-depolama
│   ├── /basaksehir-esya-depolama
│   ├── /bayrampasa-esya-depolama
│   ├── /besiktas-esya-depolama
│   ├── /beylikduzu-esya-depolama
│   ├── /beyoglu-esya-depolama
│   ├── /buyukcekmece-esya-depolama
│   ├── /catalca-esya-depolama
│   ├── /esenler-esya-depolama
│   ├── /esenyurt-esya-depolama
│   ├── /eyupsultan-esya-depolama
│   ├── /fatih-esya-depolama
│   ├── /gaziosmanpasa-esya-depolama
│   ├── /gungoren-esya-depolama
│   ├── /kagithane-esya-depolama
│   ├── /kucukcekmece-esya-depolama
│   ├── /sariyer-esya-depolama
│   ├── /silivri-esya-depolama
│   ├── /sultangazi-esya-depolama
│   ├── /sisli-esya-depolama
│   └── /zeytinburnu-esya-depolama
└── /admin                 → Admin Panel
    ├── /admin/login       → Admin Giriş
    └── /admin/*           → Admin Sayfaları
```

## 📄 Sayfa Detayları

### Ana Sayfa (`/`)

**Bölümler (Sırayla):**
1. **Hero Section**
   - Sol: H1, açıklama, CTA butonlar
   - Sağ: Fiyat hesaplama formu

2. **Hizmetlerimiz**
   - 6 hizmet kartı (grid 3 sütun)
   - İkon + başlık + kısa açıklama

3. **Neden Biz?**
   - 6 özellik kartı (grid 3 sütun)
   - İkon + başlık + açıklama

4. **Fiyatlarımız**
   - Responsive tablo
   - m³ × süre matrisi
   - Vurgulu paket fiyatlar

5. **Galeri**
   - 8 fotoğraf (grid 4 sütun)
   - Depo görselleri

6. **Sık Sorulan Sorular**
   - Accordion (10 soru)
   - Schema.org FAQPage

7. **Müşteri Yorumları**
   - 6 yorum kartı (grid 3 sütun)
   - 5 yıldız + metin + isim

8. **İletişim/Teklif Formu**
   - Form + harita + iletişim bilgileri

**Meta:**
- Title: "Avrupa Yakası Eşya Depolama - Güvenli ve Uygun Fiyatlı Self Storage"
- Description: "İstanbul Avrupa Yakası'nda güvenli eşya depolama hizmeti. 7/24 kamera, klimalı depolar, uygun fiyatlar. Hemen teklif alın!"
- Schema: Organization, LocalBusiness, Service, FAQPage, AggregateRating

---

### Hakkımızda (`/hakkimizda`)

**Bölümler:**
1. **Hero**
   - H1: "Hakkımızda"
   - Kısa açıklama

2. **Şirket Hikayesi**
   - 2-3 paragraf
   - Kuruluş, vizyon, misyon

3. **Neden Biz?**
   - 6 özellik (aynı ana sayfa gibi)

4. **Ekibimiz** (Opsiyonel)
   - Fotoğraf + isim + pozisyon

5. **İletişim CTA**
   - "Hemen Teklif Alın" butonu

**Meta:**
- Title: "Hakkımızda - Avrupa Yakası Eşya Depolama"
- Description: "15 yıllık tecrübemizle İstanbul'da güvenli eşya depolama hizmeti sunuyoruz. Profesyonel ekip, modern tesisler."
- Schema: Organization, BreadcrumbList

---

### Fiyatlarımız (`/fiyatlarimiz`)

**Bölümler:**
1. **Hero**
   - H1: "Eşya Depolama Fiyatları"
   - Açıklama

2. **Fiyat Tablosu**
   - m³ × süre matrisi
   - Tüm fiyatlar

3. **Paket Fiyatlar**
   - İndirimli paketler
   - 3 ay %10, 6 ay %15, 1 yıl %20

4. **Ek Hizmetler Fiyatları**
   - Taşıma
   - Montaj/Demontaj
   - Ambalaj Malzemesi
   - Klimalı Depo (ekstra)
   - Sigorta

5. **Fiyat Hesaplama Formu**
   - Interaktif hesaplama

6. **SSS (Fiyatlarla İlgili)**
   - "Fiyatlara KDV dahil mi?"
   - "İndirim var mı?"
   - vb.

**Meta:**
- Title: "Eşya Depolama Fiyatları - Uygun Paketler | Avrupa Yakası"
- Description: "Eşya depolama fiyatlarımız ve kampanyalı paketlerimiz. 1m³'den 100m³'e kadar tüm ihtiyaçlarınız için uygun fiyatlar."
- Schema: AggregateOffer, FAQPage, BreadcrumbList

---

### İletişim (`/iletisim`)

**Bölümler:**
1. **Hero**
   - H1: "İletişim"
   - Açıklama

2. **İletişim Bilgileri**
   - Telefon
   - WhatsApp
   - Email
   - Adres
   - Çalışma saatleri

3. **Teklif Formu**
   - Ad, Telefon, Email, m³, Süre, Mesaj
   - Submit → SMTP email

4. **Harita**
   - Google Maps embed
   - Depo konumu

5. **Sosyal Medya**
   - Facebook, Instagram, Twitter, LinkedIn

**Meta:**
- Title: "İletişim - Avrupa Yakası Eşya Depolama"
- Description: "Eşya depolama hizmeti için bizimle iletişime geçin. Telefon: +90 532 138 4979, WhatsApp, Email."
- Schema: ContactPage, LocalBusiness, BreadcrumbList

---

### Bölge Sayfaları (`/[slug]`)

**Örnek:** `/besiktas-esya-depolama`

**Bölümler:**
1. **Hero**
   - Sol: H1 "[Bölge] Eşya Depolama", açıklama
   - Sağ: Fiyat hesaplama formu

2. **Bölge Hakkında**
   - 2-3 paragraf
   - "[Bölge]'de eşya depolama hizmeti..."
   - Yerel bilgiler

3. **Fiyatlarımız**
   - Aynı fiyat tablosu (tüm bölgelerde aynı)

4. **Harita**
   - Bölge merkezi (Google Maps)

5. **SSS (Bölgeye Özel)**
   - 5-10 soru
   - "[Bölge]'de eşya depolama güvenli mi?"
   - "[Bölge]'ye taşıma yapıyor musunuz?"

6. **Yorumlar (Bölgeye Özel)**
   - 5-6 yorum
   - Bölge sakinlerinden

7. **Teklif Formu**
   - Aynı form

**Meta:**
- Title: "[Bölge] Eşya Depolama - Güvenli ve Uygun Fiyatlı | Avrupa Yakası"
- Description: "[Bölge]'de profesyonel eşya depolama hizmeti. Sigortalı, güvenli, uygun fiyatlı. Hemen teklif alın!"
- Schema: LocalBusiness, Service, FAQPage, Review, BreadcrumbList

**Dinamik Slug Oluşturma:**
```typescript
// lib/utils.ts
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    + '-esya-depolama';
}

// Örnek:
// "Beşiktaş" → "besiktas-esya-depolama"
// "Eyüpsultan" → "eyupsultan-esya-depolama"
```

---

### Admin Panel (`/admin`)

**Sayfalar:**
- `/admin/login` → Giriş
- `/admin` → Dashboard (ana panel)
- `/admin/site-settings` → Site ayarları
- `/admin/prices` → Fiyat yönetimi
- `/admin/regions` → Bölge yönetimi
- `/admin/faq` → SSS yönetimi
- `/admin/reviews` → Yorum yönetimi
- `/admin/gallery` → Galeri yönetimi
- `/admin/services` → Hizmetler
- `/admin/features` → Neden Biz
- `/admin/smtp` → SMTP ayarları
- `/admin/seo` → SEO ayarları

Detay: `ADMIN_PANEL.md`

---

## 🧩 Component Hiyerarşisi

### Layout Components

```
app/layout.tsx (Root Layout)
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── NavLink (Ana Sayfa, Hakkımızda, Fiyatlar, İletişim)
│   │   └── MobileMenu (Hamburger)
│   └── ContactButtons
│       ├── PhoneButton
│       └── WhatsAppButton
├── {children} (Sayfa içeriği)
└── Footer
    ├── FooterAbout
    ├── FooterRegions (25 bölge linkleri)
    ├── FooterContact
    └── FooterSocial
```

### Home Page Components

```
app/page.tsx
├── Hero
│   ├── HeroContent (Sol)
│   │   ├── Heading (H1)
│   │   ├── Description
│   │   └── CTAButtons
│   └── PriceCalculator (Sağ)
├── Services
│   └── ServiceCard × 6
├── Features
│   └── FeatureCard × 6
├── Pricing
│   └── PriceTable
├── Gallery
│   └── GalleryImage × 8
├── FAQ
│   └── FAQItem × 10 (Accordion)
├── Reviews
│   └── ReviewCard × 6
└── ContactSection
    ├── ContactForm
    ├── ContactInfo
    └── Map
```

### Region Page Components

```
app/[slug]/page.tsx
├── RegionHero
│   ├── RegionContent (Sol)
│   └── PriceCalculator (Sağ)
├── RegionAbout
├── Pricing (Tablo)
├── Map (Bölge merkezi)
├── FAQ (Bölgeye özel)
├── Reviews (Bölgeye özel)
└── ContactForm
```

### Shared Components

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── MobileMenu.tsx
│   └── Breadcrumb.tsx
├── forms/
│   ├── PriceCalculator.tsx
│   │   ├── VolumeSelect
│   │   ├── DurationSelect
│   │   ├── ServicesCheckbox
│   │   └── PriceResult
│   └── ContactForm.tsx
│       ├── Input
│       ├── Textarea
│       └── SubmitButton
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Checkbox.tsx
│   ├── Accordion.tsx
│   └── Modal.tsx
├── home/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Gallery.tsx
│   ├── FAQ.tsx
│   └── Reviews.tsx
└── shared/
    ├── ServiceCard.tsx
    ├── FeatureCard.tsx
    ├── ReviewCard.tsx
    ├── FAQItem.tsx
    ├── PriceTable.tsx
    ├── Map.tsx
    └── StickyButtons.tsx
```

---

## 🔀 Routing Stratejisi

### Static Generation (SSG)

**Tüm sayfalar build-time'da oluşturulur:**

```typescript
// app/[slug]/page.tsx
export async function generateStaticParams() {
  const regions = await getRegions();
  
  return regions.map((region) => ({
    slug: region.slug,
  }));
}

// Build output:
// /.next/server/app/besiktas-esya-depolama.html
// /.next/server/app/sisli-esya-depolama.html
// ... (25 adet)
```

**Avantajlar:**
- ⚡ Çok hızlı (pre-rendered HTML)
- 💰 Düşük maliyet
- 🔒 Güvenli
- 📈 SEO-friendly

### Dynamic Routes

```typescript
// app/[slug]/page.tsx
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function RegionPage({ params }: PageProps) {
  const region = await getRegion(params.slug);
  
  if (!region) {
    notFound(); // 404
  }
  
  return <RegionContent region={region} />;
}
```

### 404 Handling

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Sayfa Bulunamadı</h1>
      <p className="mb-8">Aradığınız sayfa mevcut değil.</p>
      <Link href="/" className="btn-primary">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
```

---

## 📊 Data Flow

### Server-Side Data Fetching

```typescript
// app/page.tsx (Server Component)
import fs from 'fs/promises';

async function getData() {
  const [config, services, features, prices, faq, reviews] = await Promise.all([
    fs.readFile('data/site-config.json', 'utf-8'),
    fs.readFile('data/services.json', 'utf-8'),
    fs.readFile('data/features.json', 'utf-8'),
    fs.readFile('data/prices.json', 'utf-8'),
    fs.readFile('data/faq.json', 'utf-8'),
    fs.readFile('data/reviews.json', 'utf-8'),
  ]);
  
  return {
    config: JSON.parse(config),
    services: JSON.parse(services),
    features: JSON.parse(features),
    prices: JSON.parse(prices),
    faq: JSON.parse(faq),
    reviews: JSON.parse(reviews),
  };
}

export default async function HomePage() {
  const data = await getData();
  
  return (
    <>
      <Hero config={data.config} />
      <Services services={data.services} />
      <Features features={data.features} />
      <Pricing prices={data.prices} />
      <FAQ faq={data.faq} />
      <Reviews reviews={data.reviews} />
    </>
  );
}
```

### Client Components (Interaktif)

```typescript
// components/forms/PriceCalculator.tsx
'use client';

import { useState } from 'react';

interface Props {
  prices: PriceData;
}

export default function PriceCalculator({ prices }: Props) {
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(1);
  
  const totalPrice = calculatePrice(volume, duration, prices);
  
  return (
    <form>
      <Select value={volume} onChange={setVolume} />
      <Select value={duration} onChange={setDuration} />
      <div>Toplam: {totalPrice}₺</div>
    </form>
  );
}
```

**Kural:**
- ✅ Server Component: Veri çekme, SEO
- ✅ Client Component: Interaktif, state
- ❌ Client Component'te useEffect + fetch YASAK

---

## 🔗 Navigation & Links

### Main Navigation

```tsx
// components/layout/Navigation.tsx
const navItems = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/fiyatlarimiz', label: 'Fiyatlarımız' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Navigation() {
  return (
    <nav>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

### Footer Regions

```tsx
// components/layout/Footer.tsx
export default async function Footer() {
  const regions = await getRegions();
  
  return (
    <footer>
      <div>
        <h3>Hizmet Bölgelerimiz</h3>
        <ul className="grid grid-cols-2 gap-2">
          {regions.slice(0, 10).map((region) => (
            <li key={region.slug}>
              <Link href={`/${region.slug}`}>
                {region.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
```

### Breadcrumbs

```tsx
// components/layout/Breadcrumb.tsx
interface Props {
  items: Array<{ label: string; href?: string }>;
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2">
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Kullanım:
<Breadcrumb
  items={[
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Beşiktaş Eşya Depolama' },
  ]}
/>
```

---

## 🎨 Layout Patterns

### Container

```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* İçerik */}
</div>
```

### Section

```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">Başlık</h2>
    {/* İçerik */}
  </div>
</section>
```

### Grid

```tsx
{/* 3 sütun (tablet: 2, mobil: 1) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Hero Layout

```tsx
<section className="py-20 bg-gradient-to-br from-blue-50 to-white">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>{/* Sol: İçerik */}</div>
      <div>{/* Sağ: Form */}</div>
    </div>
  </div>
</section>
```

---

## 📱 Responsive Breakpoints

```typescript
// tailwind.config.js
screens: {
  'sm': '640px',   // Mobil landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

**Kullanım:**
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

---

## 🔐 Protected Routes (Admin)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token');
    
    if (!token && request.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

---

## 🎯 Performance Optimization

### Code Splitting

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <p>Yükleniyor...</p>,
});
```

### Prefetching

```tsx
// Next.js otomatik prefetch yapar (viewport'ta görünen Link'ler)
<Link href="/fiyatlarimiz" prefetch={true}>
  Fiyatlarımız
</Link>
```

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/depo.jpg"
  alt="Eşya Depolama"
  width={1200}
  height={800}
  priority={isHero} // Hero image için
  loading={isHero ? 'eager' : 'lazy'}
  quality={85}
/>
```

---

## 📊 Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const regions = await getRegions();
  const baseUrl = 'https://avrupayakasiesyadepolama.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fiyatlarimiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...regions.map((region) => ({
      url: `${baseUrl}/${region.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
}
```

---

## 🔍 SEO Per Page

### Metadata Generation

```typescript
// app/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const region = await getRegion(params.slug);
  const config = await getSiteConfig();
  
  return {
    title: `${region.name} - ${config.site.name}`,
    description: `${region.name}'de profesyonel eşya depolama hizmeti...`,
    alternates: {
      canonical: `https://${config.site.domain}/${region.slug}`,
    },
  };
}
```

### Schema Generation

```typescript
// lib/schema.ts
export function generateLocalBusinessSchema(region: Region, config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SelfStorage'],
    name: `${region.name} Eşya Depolama`,
    url: `https://${config.site.domain}/${region.slug}`,
    // ...
  };
}
```

---

## ✅ Sayfa Checklist

Her sayfa için:
- [x] Unique title
- [x] Meta description
- [x] H1 tag
- [x] Breadcrumb
- [x] Schema.org
- [x] Canonical URL
- [x] Alt texts (görseller)
- [x] Internal links
- [x] Mobile-friendly
- [x] Fast loading
