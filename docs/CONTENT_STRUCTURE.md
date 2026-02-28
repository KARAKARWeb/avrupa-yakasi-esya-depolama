# İçerik Yapısı

Eşya depolama web sitesinin JSON dosya yapıları ve veri şemaları.

## 📁 JSON Dosyaları

Tüm içerik `/data` klasöründe JSON formatında saklanır.

```
data/
├── site-config.json          # Site ayarları
├── prices.json               # Fiyatlar
├── services.json             # Hizmetler
├── features.json             # Neden Biz
├── regions.json              # 25 bölge
├── faq.json                  # SSS
├── reviews.json              # Yorumlar
├── gallery.json              # Galeri
├── smtp-config.json          # SMTP ayarları
├── seo-config.json           # SEO templates
└── admin-users.json          # Admin kullanıcılar
```

---

## 1. site-config.json

**Amaç:** Domain-bağımsız site ayarları

**Şema:**
```typescript
interface SiteConfig {
  site: {
    domain: string;
    name: string;
    title: string;
    description: string;
    keywords: string[];
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  location: {
    city: string;
    region: string;
    lat: string;
    lng: string;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  business: {
    hours: {
      weekdays: { open: string; close: string };
      saturday: { open: string; close: string };
      sunday: { open: string; close: string };
    };
    googleBusinessUrl: string;
  };
}
```

**Örnek:**
```json
{
  "site": {
    "domain": "avrupayakasiesyadepolama.com",
    "name": "Avrupa Yakası Eşya Depolama",
    "title": "Avrupa Yakası Eşya Depolama - Güvenli ve Uygun Fiyatlı Self Storage",
    "description": "İstanbul Avrupa Yakası'nda güvenli eşya depolama hizmeti. 7/24 kamera, klimalı depolar, uygun fiyatlar. Hemen teklif alın!",
    "keywords": [
      "eşya depolama",
      "self storage",
      "avrupa yakası eşya depolama",
      "güvenli depolama",
      "uygun fiyat"
    ]
  },
  "contact": {
    "phone": "+90 532 138 4979",
    "whatsapp": "+90 532 138 4979",
    "email": "info@avrupayakasiesyadepolama.com",
    "address": "Örnek Mahallesi, Depo Sokak No:1, Beşiktaş/İstanbul"
  },
  "location": {
    "city": "İstanbul",
    "region": "Avrupa Yakası",
    "lat": "41.0422",
    "lng": "29.0078"
  },
  "social": {
    "facebook": "https://facebook.com/avrupayakasiesyadepolama",
    "instagram": "https://instagram.com/avrupayakasiesyadepolama",
    "twitter": "https://twitter.com/avrupayakasiesya",
    "linkedin": "https://linkedin.com/company/avrupayakasiesyadepolama"
  },
  "business": {
    "hours": {
      "weekdays": { "open": "08:00", "close": "18:00" },
      "saturday": { "open": "10:00", "close": "18:00" },
      "sunday": { "open": "10:00", "close": "15:00" }
    },
    "googleBusinessUrl": ""
  }
}
```

---

## 2. prices.json

**Amaç:** Fiyatlandırma verileri

**Şema:**
```typescript
interface PriceData {
  base: {
    [volume: number]: number; // m³ → aylık fiyat
  };
  discounts: {
    [duration: number]: number; // ay → indirim oranı (%)
  };
  services: {
    tasima: number;
    montaj: number;
    ambalaj: number;
    klimali: number;
    sigorta: number;
  };
  packages: Array<{
    id: string;
    name: string;
    volume: number;
    duration: number;
    price: number;
    discount: number;
    featured: boolean;
  }>;
}
```

**Örnek:**
```json
{
  "base": {
    "1": 450,
    "2": 800,
    "3": 1100,
    "5": 1700,
    "10": 3000,
    "20": 5500,
    "30": 7800,
    "50": 12000,
    "100": 22000
  },
  "discounts": {
    "3": 10,
    "6": 15,
    "12": 20
  },
  "services": {
    "tasima": 300,
    "montaj": 200,
    "ambalaj": 150,
    "klimali": 100,
    "sigorta": 150
  },
  "packages": [
    {
      "id": "paket-1",
      "name": "Ekonomik Paket",
      "volume": 5,
      "duration": 3,
      "price": 4590,
      "discount": 10,
      "featured": false
    },
    {
      "id": "paket-2",
      "name": "Standart Paket",
      "volume": 10,
      "duration": 6,
      "price": 15300,
      "discount": 15,
      "featured": true
    },
    {
      "id": "paket-3",
      "name": "Premium Paket",
      "volume": 20,
      "duration": 12,
      "price": 52800,
      "discount": 20,
      "featured": false
    }
  ]
}
```

---

## 3. services.json

**Amaç:** Ana sayfa hizmetler grid

**Şema:**
```typescript
interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
  order: number;
}
```

**Örnek:**
```json
[
  {
    "id": "ev-esyasi",
    "icon": "Home",
    "title": "Ev Eşyası Depolama",
    "description": "Ev eşyalarınızı güvenle depolayın. Mobilya, beyaz eşya ve tüm ev eşyaları için.",
    "order": 1
  },
  {
    "id": "ofis-esyasi",
    "icon": "Briefcase",
    "title": "Ofis Eşyası Depolama",
    "description": "Ofis mobilyaları, arşiv ve ekipmanlarınız için profesyonel depolama.",
    "order": 2
  },
  {
    "id": "arsiv",
    "icon": "Archive",
    "title": "Arşiv Depolama",
    "description": "Belgeleriniz ve arşivleriniz için güvenli ve düzenli depolama.",
    "order": 3
  },
  {
    "id": "arac",
    "icon": "Car",
    "title": "Araç Depolama",
    "description": "Otomobil, motosiklet ve diğer araçlarınız için kapalı depo.",
    "order": 4
  },
  {
    "id": "tasima",
    "icon": "Truck",
    "title": "Taşıma Hizmeti",
    "description": "Profesyonel ekibimizle eşyalarınızı depoya taşıyoruz.",
    "order": 5
  },
  {
    "id": "paketleme",
    "icon": "Package",
    "title": "Paketleme Hizmeti",
    "description": "Eşyalarınızı güvenli şekilde paketleme ve ambalaj hizmeti.",
    "order": 6
  }
]
```

---

## 4. features.json

**Amaç:** Neden Biz bölümü

**Şema:**
```typescript
interface Feature {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
  order: number;
}
```

**Örnek:**
```json
[
  {
    "id": "guvenli",
    "icon": "Shield",
    "title": "Güvenli ve Sigortalı",
    "description": "Tüm eşyalarınız sigortalıdır. 7/24 güvenlik kamerası ve alarm sistemi.",
    "order": 1
  },
  {
    "id": "kamera",
    "icon": "Camera",
    "title": "7/24 Kamera Sistemi",
    "description": "Depolarımız 7/24 kamera ile izlenmektedir. Güvenliğiniz bizim önceliğimiz.",
    "order": 2
  },
  {
    "id": "klimali",
    "icon": "Thermometer",
    "title": "Klimalı Depolar",
    "description": "Hassas eşyalarınız için klimalı depo seçeneği mevcuttur.",
    "order": 3
  },
  {
    "id": "tasima",
    "icon": "Truck",
    "title": "Ücretsiz Taşıma",
    "description": "Belirli mesafe içinde ücretsiz taşıma hizmeti sunuyoruz.",
    "order": 4
  },
  {
    "id": "fiyat",
    "icon": "DollarSign",
    "title": "Uygun Fiyat Garantisi",
    "description": "En uygun fiyatlarla kaliteli hizmet. Fiyat karşılaştırması yapın.",
    "order": 5
  },
  {
    "id": "erisim",
    "icon": "Clock",
    "title": "Esnek Erişim",
    "description": "Çalışma saatlerimiz içinde eşyalarınıza istediğiniz zaman erişebilirsiniz.",
    "order": 6
  }
]
```

---

## 5. regions.json

**Amaç:** 25 hizmet bölgesi

**Şema:**
```typescript
interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  metaTitle?: string;
  metaDescription?: string;
}
```

**Örnek:**
```json
[
  {
    "id": "besiktas",
    "name": "Beşiktaş Eşya Depolama",
    "slug": "besiktas-esya-depolama",
    "description": "Beşiktaş'ta güvenli ve uygun fiyatlı eşya depolama hizmeti.",
    "content": "Beşiktaş, İstanbul'un en merkezi ilçelerinden biridir. Beşiktaş'ta eşya depolama hizmeti arıyorsanız, güvenli ve uygun fiyatlı çözümlerimizle yanınızdayız. Modern depolarımızda eşyalarınızı güvenle saklayabilirsiniz.\n\nBeşiktaş'ta ev eşyası, ofis eşyası, arşiv ve araç depolama hizmetleri sunuyoruz. Profesyonel ekibimizle taşıma ve paketleme hizmetleri de mevcuttur.\n\nBeşiktaş'a özel kampanyalarımız için bizimle iletişime geçin.",
    "coordinates": {
      "lat": "41.0422",
      "lng": "29.0078"
    },
    "metaTitle": "Beşiktaş Eşya Depolama - Güvenli ve Uygun Fiyatlı | Avrupa Yakası",
    "metaDescription": "Beşiktaş'ta profesyonel eşya depolama hizmeti. Sigortalı, güvenli, uygun fiyatlı. Hemen teklif alın!"
  },
  {
    "id": "sisli",
    "name": "Şişli Eşya Depolama",
    "slug": "sisli-esya-depolama",
    "description": "Şişli'de güvenli ve uygun fiyatlı eşya depolama hizmeti.",
    "content": "Şişli, İstanbul'un iş ve ticaret merkezlerinden biridir...",
    "coordinates": {
      "lat": "41.0602",
      "lng": "28.9887"
    }
  }
  // ... 23 bölge daha
]
```

**25 Bölge Listesi:**
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

---

## 6. faq.json

**Amaç:** Sık sorulan sorular

**Şema:**
```typescript
interface FAQ {
  general: Array<{
    id: string;
    question: string;
    answer: string;
    order: number;
  }>;
  regions: Array<{
    regionId: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
      order: number;
    }>;
  }>;
}
```

**Örnek:**
```json
{
  "general": [
    {
      "id": "faq-1",
      "question": "Eşya depolama fiyatları nedir?",
      "answer": "Eşya depolama fiyatlarımız 1m³ için aylık 450₺'den başlamaktadır. Süreye göre indirimlerimiz mevcuttur. 3 ay için %10, 6 ay için %15, 1 yıl için %20 indirim uygulanmaktadır.",
      "order": 1
    },
    {
      "id": "faq-2",
      "question": "Depolarınız güvenli mi?",
      "answer": "Evet, tüm depolarımızda 7/24 kamera sistemi, alarm ve güvenlik görevlisi bulunmaktadır. Ayrıca tüm eşyalarınız sigortalıdır.",
      "order": 2
    },
    {
      "id": "faq-3",
      "question": "Klimalı depo var mı?",
      "answer": "Evet, klimalı depo seçeneğimiz mevcuttur. Hassas eşyalarınız için önerilir. Aylık 100₺ ekstra ücret ile klimalı depoda saklayabilirsiniz.",
      "order": 3
    },
    {
      "id": "faq-4",
      "question": "Sigorta yapıyor musunuz?",
      "answer": "Evet, tüm eşyalarınız için sigorta hizmeti sunuyoruz. Sigorta ücreti aylık 150₺'dir.",
      "order": 4
    },
    {
      "id": "faq-5",
      "question": "Taşıma hizmeti veriyor musunuz?",
      "answer": "Evet, profesyonel ekibimizle taşıma hizmeti sunuyoruz. Taşıma ücreti 300₺'den başlamaktadır. Belirli mesafe içinde ücretsiz taşıma kampanyalarımız mevcuttur.",
      "order": 5
    },
    {
      "id": "faq-6",
      "question": "Minimum süre var mı?",
      "answer": "Minimum 1 ay süre ile depolama yapabilirsiniz. Daha kısa süreler için lütfen bizimle iletişime geçin.",
      "order": 6
    },
    {
      "id": "faq-7",
      "question": "Eşyalarıma ne zaman erişebilirim?",
      "answer": "Çalışma saatlerimiz içinde (Pazartesi-Cuma 08:00-18:00, Cumartesi 10:00-18:00, Pazar 10:00-15:00) eşyalarınıza erişebilirsiniz. Önceden haber vermeniz yeterlidir.",
      "order": 7
    },
    {
      "id": "faq-8",
      "question": "Ödeme nasıl yapılır?",
      "answer": "Nakit, Havale/EFT veya Kredi Kartı ile ödeme yapabilirsiniz. Aylık veya dönemlik ödeme seçenekleri mevcuttur.",
      "order": 8
    },
    {
      "id": "faq-9",
      "question": "İptal politikanız nedir?",
      "answer": "1 ay önceden haber vererek sözleşmenizi iptal edebilirsiniz. Ödediğiniz ücret iade edilmez, ancak kalan süre için ücret alınmaz.",
      "order": 9
    },
    {
      "id": "faq-10",
      "question": "Hangi bölgelere hizmet veriyorsunuz?",
      "answer": "İstanbul Avrupa Yakası'nın tüm ilçelerine hizmet veriyoruz. Beşiktaş, Şişli, Bakırköy, Beyoğlu ve diğer 21 ilçede hizmetinizdeyiz.",
      "order": 10
    }
  ],
  "regions": [
    {
      "regionId": "besiktas",
      "questions": [
        {
          "id": "besiktas-faq-1",
          "question": "Beşiktaş'ta deponuz var mı?",
          "answer": "Evet, Beşiktaş'ta modern depolarımız bulunmaktadır. Merkezi konumumuzla kolayca ulaşabilirsiniz.",
          "order": 1
        },
        {
          "id": "besiktas-faq-2",
          "question": "Beşiktaş'a taşıma yapıyor musunuz?",
          "answer": "Evet, Beşiktaş'a ücretsiz taşıma hizmeti sunuyoruz. Profesyonel ekibimizle eşyalarınızı güvenle taşıyoruz.",
          "order": 2
        },
        {
          "id": "besiktas-faq-3",
          "question": "Beşiktaş'ta fiyatlar farklı mı?",
          "answer": "Hayır, tüm bölgelerde aynı fiyatlarımız geçerlidir. Beşiktaş için özel kampanyalarımız olabilir, lütfen bizimle iletişime geçin.",
          "order": 3
        }
      ]
    }
  ]
}
```

---

## 7. reviews.json

**Amaç:** Müşteri yorumları

**Şema:**
```typescript
interface Reviews {
  general: Array<{
    id: string;
    name: string;
    rating: number; // 1-5
    comment: string;
    date: string; // YYYY-MM-DD
    verified: boolean;
  }>;
  regions: Array<{
    regionId: string;
    reviews: Array<{
      id: string;
      name: string;
      rating: number;
      comment: string;
      date: string;
      verified: boolean;
    }>;
  }>;
  stats: {
    totalReviews: number;
    averageRating: number;
  };
}
```

**Örnek:**
```json
{
  "general": [
    {
      "id": "review-1",
      "name": "Ahmet Y.",
      "rating": 5,
      "comment": "Çok memnun kaldım, güvenli ve temiz. Kesinlikle tavsiye ederim. Eşyalarım 6 aydır burada, hiçbir sorun yaşamadım.",
      "date": "2024-01-15",
      "verified": true
    },
    {
      "id": "review-2",
      "name": "Ayşe K.",
      "rating": 5,
      "comment": "Profesyonel ekip, uygun fiyatlar. Taşıma hizmeti de çok iyi. Teşekkürler.",
      "date": "2024-01-10",
      "verified": true
    },
    {
      "id": "review-3",
      "name": "Mehmet S.",
      "rating": 4,
      "comment": "Güvenli ve temiz. Fiyatlar uygun. Tek eksik 7/24 erişim olmaması.",
      "date": "2024-01-05",
      "verified": true
    },
    {
      "id": "review-4",
      "name": "Zeynep A.",
      "rating": 5,
      "comment": "Ev taşınırken eşyalarımı 3 ay depoladım. Hiçbir sorun olmadı. Çok teşekkürler.",
      "date": "2023-12-28",
      "verified": true
    },
    {
      "id": "review-5",
      "name": "Can D.",
      "rating": 5,
      "comment": "Ofis eşyalarımızı depoladık. Güvenli, temiz ve profesyonel hizmet.",
      "date": "2023-12-20",
      "verified": true
    },
    {
      "id": "review-6",
      "name": "Elif T.",
      "rating": 5,
      "comment": "Klimalı depoda hassas eşyalarımı sakladım. Mükemmel hizmet.",
      "date": "2023-12-15",
      "verified": true
    }
  ],
  "regions": [
    {
      "regionId": "besiktas",
      "reviews": [
        {
          "id": "besiktas-review-1",
          "name": "Mehmet B.",
          "rating": 5,
          "comment": "Beşiktaş'ta eşya depolama için en iyi seçenek. Merkezi konum, güvenli.",
          "date": "2024-01-20",
          "verified": true
        },
        {
          "id": "besiktas-review-2",
          "name": "Selin K.",
          "rating": 5,
          "comment": "Beşiktaş'tan taşıma yaptılar, çok hızlı ve profesyonel.",
          "date": "2024-01-12",
          "verified": true
        }
      ]
    }
  ],
  "stats": {
    "totalReviews": 127,
    "averageRating": 4.8
  }
}
```

---

## 8. gallery.json

**Amaç:** Galeri fotoğrafları

**Şema:**
```typescript
interface Gallery {
  images: Array<{
    id: string;
    src: string;
    alt: string;
    title: string;
    order: number;
  }>;
}
```

**Örnek:**
```json
{
  "images": [
    {
      "id": "img-1",
      "src": "/uploads/gallery/depo-ici-1.webp",
      "alt": "Eşya Depolama - Depo İçi Görünüm",
      "title": "Depo İçi",
      "order": 1
    },
    {
      "id": "img-2",
      "src": "/uploads/gallery/guvenlik-kamera.webp",
      "alt": "7/24 Güvenlik Kamera Sistemi",
      "title": "Güvenlik Sistemi",
      "order": 2
    },
    {
      "id": "img-3",
      "src": "/uploads/gallery/klimali-depo.webp",
      "alt": "Klimalı Eşya Deposu",
      "title": "Klimalı Depo",
      "order": 3
    },
    {
      "id": "img-4",
      "src": "/uploads/gallery/arac-depolama.webp",
      "alt": "Araç Depolama Alanı",
      "title": "Araç Depolama",
      "order": 4
    },
    {
      "id": "img-5",
      "src": "/uploads/gallery/tasima-hizmeti.webp",
      "alt": "Profesyonel Taşıma Hizmeti",
      "title": "Taşıma Hizmeti",
      "order": 5
    },
    {
      "id": "img-6",
      "src": "/uploads/gallery/paketleme.webp",
      "alt": "Paketleme ve Ambalaj Hizmeti",
      "title": "Paketleme",
      "order": 6
    },
    {
      "id": "img-7",
      "src": "/uploads/gallery/depo-ici-2.webp",
      "alt": "Geniş Depolama Alanı",
      "title": "Geniş Alan",
      "order": 7
    },
    {
      "id": "img-8",
      "src": "/uploads/gallery/ofis-esyasi.webp",
      "alt": "Ofis Eşyası Depolama",
      "title": "Ofis Eşyası",
      "order": 8
    }
  ]
}
```

---

## 9. smtp-config.json

**Amaç:** SMTP ayarları (şifreli)

**Şema:**
```typescript
interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string; // Encrypted
}
```

**Örnek:**
```json
{
  "host": "smtp.yandex.com",
  "port": 465,
  "secure": true,
  "user": "info@avrupayakasiesyadepolama.com",
  "pass": "encrypted-password-hash"
}
```

**Not:** Şifre bcrypt ile şifrelenir veya environment variable kullanılır.

---

## 10. seo-config.json

**Amaç:** SEO meta templates

**Şema:**
```typescript
interface SEOConfig {
  metaTemplates: {
    home: {
      title: string;
      description: string;
      keywords: string[];
    };
    region: {
      titleTemplate: string;
      descriptionTemplate: string;
    };
    prices: {
      title: string;
      description: string;
    };
    about: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
    };
  };
  analytics: {
    gaId: string;
    gtmId: string;
    gscVerification: string;
  };
}
```

**Örnek:**
```json
{
  "metaTemplates": {
    "home": {
      "title": "Avrupa Yakası Eşya Depolama - Güvenli ve Uygun Fiyatlı Self Storage",
      "description": "İstanbul Avrupa Yakası'nda güvenli eşya depolama hizmeti. 7/24 kamera, klimalı depolar, uygun fiyatlar. Hemen teklif alın!",
      "keywords": [
        "eşya depolama",
        "self storage",
        "avrupa yakası",
        "güvenli depolama"
      ]
    },
    "region": {
      "titleTemplate": "[Bölge] Eşya Depolama - Güvenli ve Uygun Fiyatlı | [Site]",
      "descriptionTemplate": "[Bölge]'de profesyonel eşya depolama hizmeti. Sigortalı, güvenli, uygun fiyatlı. Hemen teklif alın!"
    },
    "prices": {
      "title": "Eşya Depolama Fiyatları - Uygun Paketler | Avrupa Yakası",
      "description": "Eşya depolama fiyatlarımız ve kampanyalı paketlerimiz. 1m³'den 100m³'e kadar tüm ihtiyaçlarınız için uygun fiyatlar."
    },
    "about": {
      "title": "Hakkımızda - Avrupa Yakası Eşya Depolama",
      "description": "15 yıllık tecrübemizle İstanbul'da güvenli eşya depolama hizmeti sunuyoruz. Profesyonel ekip, modern tesisler."
    },
    "contact": {
      "title": "İletişim - Avrupa Yakası Eşya Depolama",
      "description": "Eşya depolama hizmeti için bizimle iletişime geçin. Telefon: +90 532 138 4979, WhatsApp, Email."
    }
  },
  "analytics": {
    "gaId": "G-XXXXXXXXXX",
    "gtmId": "GTM-XXXXXXX",
    "gscVerification": "your-verification-code"
  }
}
```

---

## 11. admin-users.json

**Amaç:** Admin kullanıcılar (bcrypt hash)

**Şema:**
```typescript
interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}
```

**Örnek:**
```json
[
  {
    "id": "1",
    "username": "admin",
    "passwordHash": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Not:** `passwordHash` bcrypt ile oluşturulur:
```typescript
import bcrypt from 'bcryptjs';
const hash = await bcrypt.hash('admin123', 10);
```

---

## 🔄 Veri Güncelleme

### Server-Side Read
```typescript
// lib/data.ts
import fs from 'fs/promises';

export async function getSiteConfig() {
  const data = await fs.readFile('data/site-config.json', 'utf-8');
  return JSON.parse(data);
}

export async function getPrices() {
  const data = await fs.readFile('data/prices.json', 'utf-8');
  return JSON.parse(data);
}

export async function getRegions() {
  const data = await fs.readFile('data/regions.json', 'utf-8');
  return JSON.parse(data);
}

// ... diğer getter'lar
```

### Server Action Update
```typescript
// app/admin/actions.ts
'use server';

import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

export async function updateSiteConfig(config: SiteConfig) {
  await fs.writeFile(
    'data/site-config.json',
    JSON.stringify(config, null, 2)
  );
  
  revalidatePath('/');
  return { success: true };
}
```

---

## 📊 Veri Validasyonu

### Zod Schemas
```typescript
// lib/schemas.ts
import { z } from 'zod';

export const siteConfigSchema = z.object({
  site: z.object({
    domain: z.string().min(1),
    name: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    keywords: z.array(z.string()),
  }),
  contact: z.object({
    phone: z.string().regex(/^\+90 \d{3} \d{3} \d{4}$/),
    whatsapp: z.string().regex(/^\+90 \d{3} \d{3} \d{4}$/),
    email: z.string().email(),
    address: z.string().min(1),
  }),
  // ...
});

export const priceDataSchema = z.object({
  base: z.record(z.number()),
  discounts: z.record(z.number()),
  services: z.object({
    tasima: z.number(),
    montaj: z.number(),
    ambalaj: z.number(),
    klimali: z.number(),
    sigorta: z.number(),
  }),
  packages: z.array(z.object({
    id: z.string(),
    name: z.string(),
    volume: z.number(),
    duration: z.number(),
    price: z.number(),
    discount: z.number(),
    featured: z.boolean(),
  })),
});
```

---

## 🔐 Güvenlik

### Şifreleme
```typescript
// lib/crypto.ts
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
```

### Environment Variables
```env
# .env.local
SMTP_PASS=actual-password
ADMIN_SECRET_KEY=secret-key
```

JSON'da sadece referans:
```json
{
  "pass": "${SMTP_PASS}"
}
```

---

## ✅ JSON Checklist

- [x] site-config.json
- [x] prices.json
- [x] services.json
- [x] features.json
- [x] regions.json (25 bölge)
- [x] faq.json (genel + bölgeye özel)
- [x] reviews.json (genel + bölgeye özel)
- [x] gallery.json
- [x] smtp-config.json
- [x] seo-config.json
- [x] admin-users.json
