# Deployment Rehberi

Eşya depolama web sitesinin Vercel'e deploy edilmesi için adım adım rehber.

## 🎯 Genel Bakış

**Platform:** Vercel
**Framework:** Next.js 15
**Build Time:** ~2-3 dakika
**Deploy Type:** Static + Edge Functions

## 📋 Ön Hazırlık

### 1. GitHub Repository Oluşturma

```bash
# Git init (eğer yoksa)
git init

# .gitignore oluştur
cat > .gitignore << EOF
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOF

# İlk commit
git add .
git commit -m "Initial commit"

# GitHub'a push
git remote add origin https://github.com/username/esya-depolama.git
git branch -M main
git push -u origin main
```

### 2. Environment Variables Hazırlama

**Lokal `.env.local` dosyası:**
```env
# Site
NEXT_PUBLIC_SITE_URL=https://avrupayakasiesyadepolama.com

# SMTP (Yandex)
SMTP_HOST=smtp.yandex.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@avrupayakasiesyadepolama.com
SMTP_PASS=your-password-here

# Admin
ADMIN_SECRET_KEY=your-secret-key-here

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION=your-verification-code

# Node
NODE_ENV=production
```

---

## 🚀 Vercel Deploy Adımları

### Yöntem 1: Vercel Dashboard (Önerilen)

#### Adım 1: Vercel Hesabı
1. https://vercel.com adresine git
2. "Sign Up" → GitHub ile giriş yap
3. Hesabı onayla

#### Adım 2: Yeni Proje Oluştur
1. Dashboard'da "Add New" → "Project"
2. GitHub repository'sini seç: `esya-depolama`
3. "Import" butonuna tıkla

#### Adım 3: Proje Ayarları
```
Framework Preset: Next.js
Root Directory: ./
Build Command: next build (otomatik)
Output Directory: .next (otomatik)
Install Command: npm install (otomatik)
```

#### Adım 4: Environment Variables Ekle
```
NEXT_PUBLIC_SITE_URL = https://avrupayakasiesyadepolama.com
SMTP_HOST = smtp.yandex.com
SMTP_PORT = 465
SMTP_SECURE = true
SMTP_USER = info@avrupayakasiesyadepolama.com
SMTP_PASS = ****************
ADMIN_SECRET_KEY = ****************
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX
```

**Not:** Her değişken için "Add" butonuna tıkla

#### Adım 5: Deploy
1. "Deploy" butonuna tıkla
2. Build süreci başlar (~2-3 dakika)
3. Deploy tamamlanınca URL verilir: `https://esya-depolama.vercel.app`

---

### Yöntem 2: Vercel CLI

#### Kurulum
```bash
npm install -g vercel
```

#### Login
```bash
vercel login
```

#### Deploy
```bash
# İlk deploy
vercel

# Production deploy
vercel --prod
```

#### Environment Variables (CLI)
```bash
vercel env add SMTP_USER
# Değer gir: info@avrupayakasiesyadepolama.com

vercel env add SMTP_PASS
# Değer gir: your-password

# ... diğer değişkenler
```

---

## 🌐 Domain Bağlama

### Adım 1: Vercel'de Domain Ekle
1. Proje → "Settings" → "Domains"
2. "Add" butonuna tıkla
3. Domain gir: `avrupayakasiesyadepolama.com`
4. "Add" butonuna tıkla

### Adım 2: DNS Ayarları

**Vercel'in verdiği DNS kayıtları:**

#### A Record (Apex Domain)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME (www)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Adım 3: Domain Provider'da Ayarla

**GoDaddy Örneği:**
1. GoDaddy → "My Products" → "DNS"
2. A Record ekle:
   - Type: A
   - Host: @
   - Points to: 76.76.21.21
   - TTL: 1 Hour
3. CNAME ekle:
   - Type: CNAME
   - Host: www
   - Points to: cname.vercel-dns.com
   - TTL: 1 Hour
4. "Save"

**Cloudflare Örneği:**
1. Cloudflare → Domain → "DNS"
2. A Record ekle:
   - Type: A
   - Name: @
   - IPv4: 76.76.21.21
   - Proxy: Off (DNS only)
3. CNAME ekle:
   - Type: CNAME
   - Name: www
   - Target: cname.vercel-dns.com
   - Proxy: Off
4. "Save"

### Adım 4: SSL Sertifikası (Otomatik)
- Vercel otomatik SSL sertifikası sağlar (Let's Encrypt)
- 5-10 dakika içinde aktif olur
- HTTPS otomatik yönlendirme

### Adım 5: Doğrulama
```bash
# DNS propagation kontrolü
nslookup avrupayakasiesyadepolama.com

# HTTPS kontrolü
curl -I https://avrupayakasiesyadepolama.com
```

---

## 🔄 Otomatik Deploy (CI/CD)

### GitHub Integration
Vercel otomatik olarak GitHub ile entegre olur:

**Main Branch:**
- `git push origin main` → Otomatik production deploy

**Feature Branches:**
- `git push origin feature/yeni-ozellik` → Preview deploy
- Her PR için unique URL

**Preview URL Örneği:**
```
https://esya-depolama-git-feature-yeni-ozellik-username.vercel.app
```

### Deploy Hooks
Özel deploy tetikleyicileri:

```bash
# Vercel'den deploy hook URL al
# Settings → Git → Deploy Hooks

# Manuel deploy tetikle
curl -X POST https://api.vercel.com/v1/integrations/deploy/...
```

---

## 📊 Build Ayarları

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Vercel için optimize
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
```

### Build Output
```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         95.3 kB
├ ○ /hakkimizda                          2.1 kB         92.2 kB
├ ○ /fiyatlarimiz                        3.5 kB         93.6 kB
├ ○ /iletisim                            2.8 kB         92.9 kB
├ ● /[slug]                              4.1 kB         94.2 kB
│   ├ /besiktas-esya-depolama
│   ├ /sisli-esya-depolama
│   └ [+23 more paths]
└ ○ /admin                               8.5 kB         98.6 kB

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses getStaticProps)
```

---

## 🎯 Performance Optimization

### Edge Config
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### Edge Functions
```typescript
// middleware.ts
export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
  ],
};

export { middleware } from './middleware';
```

---

## 📈 Analytics & Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights
```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 🔍 Google Search Console

### Adım 1: Domain Verification
1. https://search.google.com/search-console
2. "Add Property" → "Domain"
3. Domain gir: `avrupayakasiesyadepolama.com`
4. TXT record ekle (DNS):
   ```
   Type: TXT
   Name: @
   Value: google-site-verification=XXXXXXXXX
   ```

### Adım 2: Sitemap Submit
1. Search Console → "Sitemaps"
2. Sitemap URL gir: `https://avrupayakasiesyadepolama.com/sitemap.xml`
3. "Submit"

### Adım 3: URL Inspection
1. Ana sayfayı test et
2. "Request Indexing"
3. 25 bölge sayfasını da ekle

---

## 📊 Google Analytics 4

### Adım 1: GA4 Property Oluştur
1. https://analytics.google.com
2. "Admin" → "Create Property"
3. Property name: "Avrupa Yakası Eşya Depolama"
4. Timezone: "Turkey"
5. Currency: "Turkish Lira"

### Adım 2: Data Stream
1. "Web" seç
2. URL: `https://avrupayakasiesyadepolama.com`
3. Stream name: "Web"
4. Measurement ID'yi kopyala: `G-XXXXXXXXXX`

### Adım 3: Environment Variable Ekle
```bash
# Vercel'de
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Adım 4: Redeploy
```bash
git commit --allow-empty -m "Add GA4"
git push origin main
```

---

## 🏷️ Google Tag Manager

### Adım 1: GTM Container Oluştur
1. https://tagmanager.google.com
2. "Create Account"
3. Container name: "Avrupa Yakası Eşya Depolama"
4. Target platform: "Web"
5. Container ID'yi kopyala: `GTM-XXXXXXX`

### Adım 2: Environment Variable
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Adım 3: Tags Ekle
- Google Analytics 4
- Facebook Pixel (opsiyonel)
- Google Ads Conversion (opsiyonel)

---

## 🔄 Yeni Domain İçin Deploy

### Senaryo: İkinci site (farklı domain)

#### Adım 1: Site Config Güncelle
```json
// data/site-config.json
{
  "site": {
    "domain": "kadikoyesyadepolama.com",
    "name": "Kadıköy Eşya Depolama",
    "title": "Kadıköy Eşya Depolama - Güvenli ve Uygun Fiyatlı"
  }
}
```

#### Adım 2: Bölgeleri Güncelle
```json
// data/regions.json
[
  { "name": "Kadıköy Eşya Depolama", "slug": "kadikoy-esya-depolama" },
  { "name": "Üsküdar Eşya Depolama", "slug": "uskudar-esya-depolama" }
  // ... Anadolu Yakası bölgeleri
]
```

#### Adım 3: Yeni Vercel Projesi
1. Aynı repo'yu kullan
2. Farklı branch oluştur: `kadikoy`
3. Vercel'de yeni proje: "Import" → `kadikoy` branch
4. Domain ekle: `kadikoyesyadepolama.com`
5. Environment variables ekle (farklı SMTP, GA, vb.)

#### Adım 4: Deploy
```bash
git checkout -b kadikoy
git push origin kadikoy
```

---

## 🐛 Troubleshooting

### Build Hatası
```bash
# Lokal test
npm run build

# Hata loglarını kontrol et
vercel logs
```

### Domain Bağlanmıyor
```bash
# DNS propagation kontrolü
dig avrupayakasiesyadepolama.com

# Whois kontrolü
whois avrupayakasiesyadepolama.com
```

### SSL Hatası
- 24 saat bekle (DNS propagation)
- Vercel → Settings → Domains → "Refresh SSL"

### Environment Variables Çalışmıyor
- `NEXT_PUBLIC_` prefix ekle (client-side için)
- Redeploy et (env değişikliği sonrası)

### 404 Hatası
- `next.config.js` kontrol et
- Sitemap.xml kontrol et
- Vercel logs kontrol et

---

## 📋 Deploy Checklist

### Pre-Deploy
- [ ] `.env.local` hazır
- [ ] GitHub repo oluşturuldu
- [ ] `package.json` doğru
- [ ] `next.config.js` optimize
- [ ] Build lokal test edildi (`npm run build`)

### Vercel Setup
- [ ] Vercel hesabı oluşturuldu
- [ ] Proje import edildi
- [ ] Environment variables eklendi
- [ ] İlk deploy başarılı

### Domain Setup
- [ ] Domain satın alındı
- [ ] DNS kayıtları eklendi (A, CNAME)
- [ ] SSL aktif
- [ ] www redirect çalışıyor

### Analytics
- [ ] Google Analytics 4 kuruldu
- [ ] Google Tag Manager kuruldu
- [ ] Google Search Console kuruldu
- [ ] Sitemap submit edildi

### Testing
- [ ] Ana sayfa çalışıyor
- [ ] 25 bölge sayfası çalışıyor
- [ ] Formlar çalışıyor (SMTP)
- [ ] Admin panel çalışıyor
- [ ] Mobil responsive
- [ ] PSI skoru %95+

### Post-Deploy
- [ ] Google'da indexlendi
- [ ] Sosyal medya paylaşımları test edildi (OG tags)
- [ ] Backup alındı
- [ ] Monitoring kuruldu

---

## 🔐 Güvenlik

### Environment Variables
```bash
# Asla commit etme
.env.local
.env

# Vercel'de şifrele
SMTP_PASS=***
ADMIN_SECRET_KEY=***
```

### Headers
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ];
}
```

---

## 📊 Monitoring

### Vercel Dashboard
- Deployment status
- Build logs
- Analytics
- Speed Insights

### Google Search Console
- Indexing status
- Search queries
- Core Web Vitals
- Mobile usability

### Google Analytics
- Real-time visitors
- Traffic sources
- Conversion tracking
- Bounce rate

---

## 🚀 Continuous Deployment

### Workflow
```
1. Kod değişikliği yap
2. Git commit
3. Git push
4. Vercel otomatik build
5. Preview URL oluştur
6. Test et
7. Main'e merge
8. Production deploy
```

### Rollback
```bash
# Vercel dashboard'dan
Deployments → Önceki deploy → "Promote to Production"

# CLI'dan
vercel rollback
```

---

## ✅ Production Checklist

- [ ] Domain bağlandı
- [ ] SSL aktif
- [ ] Analytics çalışıyor
- [ ] SMTP çalışıyor
- [ ] Admin panel güvenli
- [ ] Sitemap submit edildi
- [ ] Google indexlendi
- [ ] PSI %95+
- [ ] Mobil test edildi
- [ ] Backup alındı
- [ ] Monitoring kuruldu
- [ ] Error tracking kuruldu

---

## 📞 Destek

**Vercel Support:**
- https://vercel.com/support
- support@vercel.com

**Dokümantasyon:**
- https://vercel.com/docs
- https://nextjs.org/docs
