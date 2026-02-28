# Eşya Depolama Web Sitesi

Modern, SEO-odaklı, domain-bağımsız eşya depolama (self storage) web sitesi.

## 📋 Proje Özeti

Bu proje, Türkiye'de eşya depolama hizmeti veren şirketler için özel olarak geliştirilmiş, domain-bağımsız, yüksek performanslı bir web sitesidir. Tek bir kod tabanı ile farklı domainler için kullanılabilir.

### İlk Site
- **Domain:** avrupayakasiesyadepolama.com
- **Bölge:** İstanbul Avrupa Yakası
- **Hizmet Bölgeleri:** 25 ilçe

## 🎯 Temel Özellikler

### Frontend
- ✅ Modern, minimal, profesyonel tasarım
- ✅ Mobil-first responsive tasarım
- ✅ %100 PSI skoru hedefi (mobil + masaüstü)
- ✅ Server-side rendering (SSR)
- ✅ Otomatik WebP görsel optimizasyonu
- ✅ Core Web Vitals optimizasyonu

### SEO
- ✅ Dinamik meta tags (domain-bağımsız)
- ✅ Schema.org (LocalBusiness, Service, FAQPage, vb.)
- ✅ Otomatik sitemap.xml
- ✅ Rich snippets (fiyat, yıldız, stok)
- ✅ Breadcrumb navigation
- ✅ Canonical URLs
- ✅ Local SEO optimizasyonu

### Özellikler
- ✅ Metreküp bazlı fiyat hesaplama formu
- ✅ Teklif formu (SMTP Yandex)
- ✅ 25 hizmet bölgesi sayfası (otomatik slug)
- ✅ Bölgeye özel SSS ve yorumlar
- ✅ Galeri sistemi
- ✅ Google Maps entegrasyonu
- ✅ WhatsApp & Telefon butonları

### Admin Panel
- ✅ JSON-bazlı içerik yönetimi
- ✅ Fiyat yönetimi (m³, süre, ek hizmetler, indirimler)
- ✅ Hizmet bölgeleri yönetimi
- ✅ SSS yönetimi
- ✅ Yorum yönetimi
- ✅ Galeri yönetimi
- ✅ Site ayarları (domain, iletişim, sosyal medya)
- ✅ SMTP ayarları + test butonu
- ✅ SEO ayarları

## 🛠️ Teknoloji Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Email:** Nodemailer (SMTP Yandex)
- **Deployment:** Vercel
- **Analytics:** Google Analytics 4, Google Tag Manager, Search Console

## 📁 Klasör Yapısı

```
esya-depolama/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx                    # Ana sayfa
│   │   ├── hakkimizda/page.tsx         # Hakkımızda
│   │   ├── fiyatlarimiz/page.tsx       # Fiyatlar
│   │   ├── iletisim/page.tsx           # İletişim
│   │   ├── [slug]/page.tsx             # Dinamik bölge sayfaları
│   │   └── admin/
│   │       ├── page.tsx                # Admin dashboard
│   │       └── login/page.tsx          # Admin login
│   ├── api/
│   │   ├── contact/route.ts            # İletişim formu API
│   │   ├── calculate/route.ts          # Fiyat hesaplama API
│   │   └── admin/
│   │       └── [...]/route.ts          # Admin API routes
│   ├── layout.tsx                      # Root layout
│   └── globals.css                     # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── Reviews.tsx
│   │   └── Gallery.tsx
│   ├── forms/
│   │   ├── PriceCalculator.tsx
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── ...
├── data/
│   ├── site-config.json                # Site ayarları (domain-bağımsız)
│   ├── prices.json                     # Fiyatlar
│   ├── services.json                   # Hizmetler
│   ├── features.json                   # Neden Biz
│   ├── regions.json                    # 25 bölge
│   ├── faq.json                        # SSS (genel + bölgeye özel)
│   ├── reviews.json                    # Yorumlar (genel + bölgeye özel)
│   ├── gallery.json                    # Galeri
│   ├── smtp-config.json                # SMTP ayarları
│   ├── seo-config.json                 # SEO templates
│   └── admin-users.json                # Admin kullanıcılar (bcrypt hash)
├── lib/
│   ├── utils.ts                        # Yardımcı fonksiyonlar
│   ├── seo.ts                          # SEO helper'ları
│   ├── schema.ts                       # Schema.org generator
│   └── email.ts                        # Email sender
├── public/
│   ├── uploads/
│   │   └── gallery/                    # Galeri görselleri
│   ├── images/                         # Statik görseller
│   └── favicon.ico
├── docs/                               # Dokümantasyon
└── .env.local                          # Environment variables
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Projeyi klonla:**
```bash
git clone <repo-url>
cd esya-depolama
```

2. **Bağımlılıkları yükle:**
```bash
npm install
```

3. **Environment variables oluştur:**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenle:
```env
# Site
NEXT_PUBLIC_SITE_URL=https://avrupayakasiesyadepolama.com

# SMTP (Yandex)
SMTP_HOST=smtp.yandex.com
SMTP_PORT=465
SMTP_USER=info@avrupayakasiesyadepolama.com
SMTP_PASS=your-password

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=bcrypt-hash

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

4. **Geliştirme sunucusunu başlat:**
```bash
npm run dev
```

Tarayıcıda aç: `http://localhost:3000`

## 📝 Kullanım

### Domain Değiştirme

1. `/data/site-config.json` dosyasını aç
2. `domain`, `name`, `title` alanlarını güncelle
3. Tüm SEO, schema, meta otomatik güncellenir

```json
{
  "site": {
    "domain": "yeni-domain.com",
    "name": "Yeni Site Adı",
    "title": "Yeni Site - Eşya Depolama"
  }
}
```

### İçerik Yönetimi

**Admin Panel:** `/admin`
- Kullanıcı adı: `admin`
- Şifre: İlk kurulumda belirlenir

### Yeni Bölge Ekleme

1. Admin panelden "Hizmet Bölgeleri" bölümüne git
2. "Yeni Bölge Ekle" butonuna tıkla
3. Bölge bilgilerini gir (ad, açıklama, koordinatlar)
4. Slug otomatik oluşturulur (örn: `besiktas-esya-depolama`)
5. Kaydet

## 🎨 Tasarım

- **Renkler:** Mavi (#0066CC), Turuncu (#FF6B35), Beyaz, Açık Gri
- **Font:** Inter (self-hosted)
- **İkonlar:** Lucide (outline)
- **Stil:** Modern, minimal, temiz

Detaylı tasarım rehberi: `docs/DESIGN.md`

## 📊 SEO Stratejisi

- Her sayfa için özel meta tags
- Schema.org yapıları (LocalBusiness, Service, FAQPage)
- Otomatik sitemap.xml
- Rich snippets (fiyat, yıldız, stok)
- Local SEO (25 bölge sayfası)
- Core Web Vitals optimizasyonu

Detaylı SEO stratejisi: `docs/SEO_STRATEGY.md`

## 🚀 Deployment (Vercel)

1. GitHub'a push et
2. Vercel'e bağla
3. Environment variables ekle
4. Deploy et

Detaylı deploy rehberi: `docs/DEPLOYMENT.md`

## 📈 Performans Hedefleri

- **Lighthouse Score:** 95+ (tüm kategoriler)
- **PSI Mobil:** %100
- **PSI Masaüstü:** %100
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

## 📞 İletişim

**Geliştirici:** KARAKAR Web Tasarım ve Yazılım Ajansı
- **Telefon:** +90 545 181 4040
- **Email:** info@karakar.web.tr
- **Website:** https://karakar.web.tr

## 📄 Lisans

Bu proje KARAKAR Web tarafından geliştirilmiştir.

## 🔗 Diğer Dokümantasyon

- [Teknoloji Stack](./TECH_STACK.md)
- [SEO Stratejisi](./SEO_STRATEGY.md)
- [Site Yapısı](./SITE_STRUCTURE.md)
- [Özellikler](./FEATURES.md)
- [Admin Panel](./ADMIN_PANEL.md)
- [Deployment](./DEPLOYMENT.md)
- [İçerik Yapısı](./CONTENT_STRUCTURE.md)
- [Tasarım Rehberi](./DESIGN.md)
