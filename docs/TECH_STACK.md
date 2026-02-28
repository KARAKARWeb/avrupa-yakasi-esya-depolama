# Teknoloji Stack

Eşya depolama web sitesi için kullanılan teknolojiler ve kütüphaneler.

## 🎯 Temel Teknolojiler

### Framework & Runtime
- **Next.js 15** (App Router)
  - React Server Components (RSC)
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API Routes
  - Image optimization
  - Font optimization
  - Edge runtime support

### Language
- **TypeScript 5+**
  - Type safety
  - Better IDE support
  - Compile-time error checking

### UI & Styling
- **React 18**
  - Concurrent features
  - Automatic batching
  - Transitions

- **Tailwind CSS 3+**
  - Utility-first CSS
  - JIT (Just-In-Time) compiler
  - PurgeCSS (otomatik)
  - Custom design system

- **Lucide React**
  - Modern icon library
  - Outline style icons
  - Tree-shakeable
  - 1000+ icons

## 📦 Bağımlılıklar

### Production Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.300.0",
    "nodemailer": "^6.9.0",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.0",
    "sharp": "^0.33.0"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/nodemailer": "^6.4.0",
    "@types/bcryptjs": "^2.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.55.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

## 🔧 Kütüphane Detayları

### Next.js 15 (App Router)

**Neden Next.js 15?**
- ✅ En yeni, en hızlı, en stabil versiyon
- ✅ SEO için mükemmel (SSR + SSG)
- ✅ Otomatik optimizasyon (görsel, font, vb.)
- ✅ Vercel entegrasyonu
- ✅ Core Web Vitals için optimize

**Kullanılan Özellikler:**
- Server Components (default)
- Client Components (interaktif bileşenler için)
- API Routes (form submission, vb.)
- Dynamic Routes (`[slug]`)
- Metadata API (SEO)
- Image Component (otomatik WebP)
- Font Optimization (self-hosted)

**Veri Çekme Stratejisi:**
```typescript
// ✅ DOĞRU: Server-side data fetching
// app/page.tsx
import fs from 'fs/promises';

export default async function HomePage() {
  const data = JSON.parse(
    await fs.readFile('data/site-config.json', 'utf-8')
  );
  
  return <HomeContent data={data} />;
}

// ❌ YANLIŞ: Client-side useEffect + fetch
// 'use client'
// useEffect(() => { fetch(...) }, [])
```

### Tailwind CSS

**Yapılandırma:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#003D7A',
        accent: '#FF6B35',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Kullanım:**
- Utility-first approach
- Custom color palette
- Responsive breakpoints (sm, md, lg, xl, 2xl)
- Dark mode desteği YOK (gerek yok)

### Lucide React

**Kullanılan İkonlar:**
- `Shield` - Güvenlik
- `Lock` - Sigorta
- `Camera` - 7/24 kamera
- `Thermometer` - Klimalı depo
- `Truck` - Taşıma
- `Package` - Paketleme
- `Clock` - 7/24 erişim
- `MapPin` - Konum
- `Phone` - Telefon
- `Mail` - Email
- `MessageCircle` - WhatsApp
- `Star` - Yıldız (yorumlar)
- `ChevronDown` - Dropdown
- `Menu` - Hamburger menü
- `X` - Kapat

**Kullanım:**
```tsx
import { Shield, Phone } from 'lucide-react';

<Shield className="w-6 h-6 text-primary" />
<Phone className="w-5 h-5" />
```

### Nodemailer (SMTP)

**Yapılandırma:**
```typescript
// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.yandex.com
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

**Kullanım:**
- Teklif formu email gönderimi
- Müşteriye otomatik teşekkür maili
- HTML email templates

### Bcrypt.js

**Kullanım:**
```typescript
import bcrypt from 'bcryptjs';

// Hash oluşturma
const hash = await bcrypt.hash(password, 10);

// Doğrulama
const isValid = await bcrypt.compare(password, hash);
```

**Amaç:**
- Admin şifre güvenliği
- Salt rounds: 10

### Zod

**Kullanım:**
```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'En az 2 karakter'),
  phone: z.string().regex(/^0\d{10}$/, 'Geçersiz telefon'),
  email: z.string().email('Geçersiz email'),
  message: z.string().min(10, 'En az 10 karakter'),
});
```

**Amaç:**
- Form validasyonu
- Type-safe data parsing
- Runtime type checking

### Sharp

**Kullanım:**
```typescript
import sharp from 'sharp';

await sharp(inputBuffer)
  .resize(1200, 800, { fit: 'cover' })
  .webp({ quality: 80 })
  .toFile(outputPath);
```

**Amaç:**
- Galeri fotoğraflarını WebP'ye çevirme
- Otomatik resize
- Optimizasyon

## 🏗️ Mimari Kararlar

### Server-Side First

**Tüm veri çekme işlemleri server-side:**
```typescript
// ✅ DOĞRU
// app/page.tsx (Server Component)
async function getData() {
  const data = await fs.readFile('data/config.json', 'utf-8');
  return JSON.parse(data);
}

export default async function Page() {
  const data = await getData();
  return <ClientComponent data={data} />;
}

// ❌ YANLIŞ
// 'use client'
// useEffect(() => {
//   fetch('/api/data').then(...)
// }, [])
```

### Domain-Bağımsız Yapı

**Tüm domain-spesifik veriler config'den:**
```typescript
// lib/config.ts
import siteConfig from '@/data/site-config.json';

export function getSiteUrl() {
  return `https://${siteConfig.site.domain}`;
}

export function getSiteName() {
  return siteConfig.site.name;
}
```

### JSON-Bazlı İçerik

**Database yerine JSON:**
- ✅ Hızlı (dosya sistemi)
- ✅ Basit (database setup yok)
- ✅ Vercel-friendly
- ✅ Git versiyonlama
- ❌ Çok fazla içerik için ölçeklenmez (bizim için sorun değil)

### Static Generation

**Tüm sayfalar build-time'da oluşturulur:**
```typescript
// app/[slug]/page.tsx
export async function generateStaticParams() {
  const regions = await getRegions();
  return regions.map(region => ({
    slug: region.slug,
  }));
}
```

**Avantajlar:**
- ⚡ Çok hızlı (pre-rendered HTML)
- 💰 Düşük maliyet (static hosting)
- 🔒 Güvenli (no server-side runtime)
- 📈 SEO-friendly

## 🚀 Performans Optimizasyonları

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/images/depo.jpg"
  alt="Eşya Depolama"
  width={1200}
  height={800}
  priority // Hero image için
  quality={85}
/>
```

**Otomatik:**
- WebP/AVIF formatına çevirme
- Lazy loading
- Responsive images
- Blur placeholder

### Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

**Avantajlar:**
- Self-hosted (Google Fonts'tan hızlı)
- FOUT/FOIT önleme
- Otomatik subset

### Code Splitting

```tsx
// Dinamik import (lazy loading)
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <p>Yükleniyor...</p>,
});
```

### Edge Runtime

```typescript
// app/api/contact/route.ts
export const runtime = 'edge';

export async function POST(request: Request) {
  // Hızlı API response
}
```

## 📊 Analytics & Monitoring

### Google Analytics 4

```tsx
// app/layout.tsx
import Script from 'next/script';

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### Google Tag Manager

```tsx
<Script id="gtm" strategy="afterInteractive">
  {`(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${GTM_ID}');`}
</Script>
```

### Google Search Console

- Sitemap.xml otomatik
- robots.txt optimize
- Structured data validation

## 🔐 Güvenlik

### Environment Variables

```env
# .env.local (GIT'e eklenmez)
SMTP_USER=info@domain.com
SMTP_PASS=secret
ADMIN_PASSWORD_HASH=bcrypt-hash
```

### CSRF Protection

- Next.js built-in protection
- SameSite cookies

### XSS Protection

- React otomatik escape
- Zod validation
- Sanitize user input

## 📱 Responsive Design

### Breakpoints

```javascript
// tailwind.config.js
screens: {
  'sm': '640px',   // Mobil landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Mobile-First

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## 🧪 Testing (Opsiyonel)

**Şu an kullanılmıyor, ileride eklenebilir:**
- Jest (unit tests)
- React Testing Library
- Playwright (e2e tests)

## 📦 Build & Deploy

### Build Komutu

```bash
npm run build
```

**Çıktı:**
- `.next/` klasörü
- Optimized production build
- Static HTML + JSON

### Deploy (Vercel)

```bash
vercel deploy --prod
```

**Otomatik:**
- Git push → otomatik deploy
- Preview deployments (PR'lar için)
- Analytics
- Edge network (global CDN)

## 🔄 Versiyon Yönetimi

### Package Versions

- **Major updates:** Manuel (breaking changes)
- **Minor updates:** Otomatik (yeni özellikler)
- **Patch updates:** Otomatik (bug fixes)

### Dependency Updates

```bash
npm outdated
npm update
```

## 📚 Kaynaklar

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Vercel Docs](https://vercel.com/docs)
