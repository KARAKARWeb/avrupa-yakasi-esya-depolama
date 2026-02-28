# Eşya Depolama Web Sitesi

Modern, SEO-odaklı, domain-bağımsız eşya depolama (self storage) web sitesi.

## 🎯 Proje Özeti

Next.js 15 ile geliştirilmiş, tamamen server-side rendering kullanan, 25 bölge sayfası olan profesyonel eşya depolama web sitesi.

### Özellikler

✅ **Next.js 15** - App Router, Server Components, SSG
✅ **TypeScript** - Tip güvenli kod
✅ **Tailwind CSS 4** - Modern, responsive tasarım
✅ **25 Bölge Sayfası** - Dinamik routing ile otomatik oluşturulur
✅ **SEO Optimize** - Schema.org, sitemap, robots.txt
✅ **Fiyat Hesaplama** - İnteraktif hesaplama formu
✅ **İletişim Formu** - Nodemailer ile SMTP entegrasyonu
✅ **JSON-bazlı İçerik** - Database gerektirmez
✅ **Domain Bağımsız** - Tek config değişikliği ile farklı domainler

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusunu başlat
npm start
```

## 🌐 Tarayıcıda Aç

Geliştirme: http://localhost:3000

## 📁 Proje Yapısı

```
esya-depolama/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Ana sayfa
│   ├── [slug]/page.tsx      # 25 bölge sayfası (dinamik)
│   ├── hakkimizda/          # Hakkımızda
│   ├── fiyatlarimiz/        # Fiyatlar
│   ├── iletisim/            # İletişim
│   ├── api/contact/         # İletişim formu API
│   ├── layout.tsx           # Root layout
│   ├── sitemap.ts           # Otomatik sitemap
│   └── robots.ts            # Robots.txt
├── components/              # React Component'leri
│   ├── ui/                  # Button, Card, Input, vb.
│   ├── layout/              # Header, Footer, Breadcrumb
│   ├── forms/               # PriceCalculator, ContactForm
│   ├── home/                # Ana sayfa component'leri
│   └── shared/              # StickyButtons
├── data/                    # JSON veri dosyaları
│   ├── site-config.json     # Site ayarları
│   ├── prices.json          # Fiyatlar
│   ├── services.json        # Hizmetler
│   ├── features.json        # Neden Biz
│   ├── regions.json         # 25 bölge
│   ├── faq.json             # SSS
│   ├── reviews.json         # Yorumlar
│   ├── gallery.json         # Galeri
│   ├── seo-config.json      # SEO ayarları
│   └── admin-users.json     # Admin kullanıcılar
├── lib/                     # Yardımcı fonksiyonlar
│   ├── data.ts              # Veri okuma fonksiyonları
│   ├── utils.ts             # Genel yardımcılar
│   └── schema.ts            # Schema.org generator
├── docs/                    # Dokümantasyon
└── public/                  # Statik dosyalar
```

## 🎨 Özellikler

### 1. Ana Sayfa
- Hero section (fiyat hesaplama formu)
- Hizmetler (6 kart)
- Neden Biz (6 özellik)
- Fiyat tablosu
- SSS (accordion)
- Müşteri yorumları
- İletişim formu

### 2. Bölge Sayfaları (25 Adet)
- Arnavutköy, Avcılar, Bağcılar, Bahçelievler, Bakırköy
- Başakşehir, Bayrampaşa, Beşiktaş, Beylikdüzü, Beyoğlu
- Büyükçekmece, Çatalca, Esenler, Esenyurt, Eyüpsultan
- Fatih, Gaziosmanpaşa, Güngören, Kâğıthane, Küçükçekmece
- Sarıyer, Silivri, Sultangazi, Şişli, Zeytinburnu

Her bölge sayfası:
- Özel H1 ve içerik
- Fiyat hesaplama formu
- Fiyat tablosu
- Google Maps
- SSS
- Yorumlar
- İletişim formu

### 3. Fiyat Hesaplama
- Metreküp seçimi (1-100m³)
- Süre seçimi (1-12 ay)
- Ek hizmetler (taşıma, montaj, ambalaj, klimalı, sigorta)
- Otomatik indirim hesaplama (%10, %15, %20)
- Anlık fiyat gösterimi

### 4. İletişim Formu
- Ad, telefon, email, m³, süre, mesaj
- Zod validasyonu
- Nodemailer ile SMTP
- Müşteriye otomatik email
- Admin'e bildirim emaili

### 5. SEO
- Dinamik meta tags
- Schema.org (LocalBusiness, FAQPage, Organization, vb.)
- Otomatik sitemap.xml
- Robots.txt
- Breadcrumb navigation
- Canonical URLs

## 🔧 Yapılandırma

### Site Ayarları

`data/site-config.json` dosyasını düzenle:

```json
{
  "site": {
    "domain": "avrupayakasiesyadepolama.com",
    "name": "Avrupa Yakası Eşya Depolama",
    "title": "...",
    "description": "..."
  },
  "contact": {
    "phone": "+90 532 138 4979",
    "email": "info@avrupayakasiesyadepolama.com"
  }
}
```

### Environment Variables

`.env.local` dosyası oluştur:

```env
# SMTP (Yandex)
SMTP_HOST=smtp.yandex.com
SMTP_PORT=465
SMTP_USER=info@avrupayakasiesyadepolama.com
SMTP_PASS=your-password

# Analytics (Opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## 🚀 Deployment (Vercel)

1. GitHub'a push et
2. Vercel'e bağla
3. Environment variables ekle
4. Deploy et

Detaylı deployment rehberi: `docs/DEPLOYMENT.md`

## 📊 Build Çıktısı

```
Route (app)
┌ ○ /                          # Ana sayfa
├ ● /[slug]                    # 25 bölge sayfası (SSG)
├ ○ /hakkimizda               # Hakkımızda
├ ○ /fiyatlarimiz             # Fiyatlar
├ ○ /iletisim                 # İletişim
├ ƒ /api/contact              # API route
├ ○ /robots.txt               # Robots
└ ○ /sitemap.xml              # Sitemap

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML
ƒ  (Dynamic)  server-rendered on demand
```

## 📱 Test Sayfaları

- Ana Sayfa: http://localhost:3000
- Beşiktaş: http://localhost:3000/besiktas-esya-depolama
- Şişli: http://localhost:3000/sisli-esya-depolama
- Hakkımızda: http://localhost:3000/hakkimizda
- Fiyatlar: http://localhost:3000/fiyatlarimiz
- İletişim: http://localhost:3000/iletisim

## 📚 Dokümantasyon

Detaylı dokümantasyon `docs/` klasöründe:

- `README.md` - Genel bakış
- `TECH_STACK.md` - Teknoloji detayları
- `SEO_STRATEGY.md` - SEO stratejisi
- `SITE_STRUCTURE.md` - Site yapısı
- `FEATURES.md` - Özellikler
- `ADMIN_PANEL.md` - Admin panel (gelecek)
- `DEPLOYMENT.md` - Deployment rehberi
- `CONTENT_STRUCTURE.md` - JSON yapıları
- `DESIGN.md` - Tasarım rehberi

## ✅ Tamamlanan Özellikler

- [x] Next.js 15 kurulumu
- [x] Tailwind CSS 4 yapılandırması
- [x] TypeScript yapılandırması
- [x] 11 JSON veri dosyası
- [x] Tüm UI component'leri
- [x] Layout component'leri (Header, Footer)
- [x] Form component'leri (PriceCalculator, ContactForm)
- [x] Ana sayfa component'leri (Hero, Services, Features, vb.)
- [x] Ana sayfa
- [x] 25 bölge sayfası (dinamik routing)
- [x] Hakkımızda sayfası
- [x] Fiyatlar sayfası
- [x] İletişim sayfası
- [x] API route (contact form)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Middleware
- [x] 404 sayfası
- [x] SEO optimizasyonu
- [x] Schema.org entegrasyonu
- [x] Responsive tasarım
- [x] Sticky butonlar (Telefon, WhatsApp)
- [x] Build başarılı
- [x] Dev sunucu çalışıyor

## 🎯 Sonraki Adımlar

1. **SMTP Ayarları**: `.env.local` dosyasına gerçek SMTP bilgilerini ekle
2. **Galeri**: `public/uploads/gallery/` klasörüne görseller ekle
3. **İçerik**: JSON dosyalarındaki içerikleri zenginleştir
4. **Test**: Tüm sayfaları ve formları test et
5. **Deploy**: Vercel'e deploy et
6. **Domain**: Domain bağla
7. **Analytics**: Google Analytics, GTM, GSC kur

## 📞 Destek

**Geliştirici:** KARAKAR Web Tasarım ve Yazılım Ajansı
- Telefon: +90 545 181 4040
- Email: info@karakar.web.tr
- Website: https://karakar.web.tr

## 📄 Lisans

Bu proje KARAKAR Web tarafından geliştirilmiştir.

---

**Not:** Proje domain-bağımsız olarak tasarlanmıştır. Farklı bir domain için sadece `data/site-config.json` dosyasını güncelleyin.
