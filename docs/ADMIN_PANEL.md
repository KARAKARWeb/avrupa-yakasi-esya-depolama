# Admin Panel

Eşya depolama web sitesi için JSON-bazlı admin panel yapısı ve özellikleri.

## 🎯 Genel Bakış

**Amaç:** JSON dosyalarını web arayüzünden düzenlemek

**Teknoloji:** Next.js App Router, Server Actions, bcrypt

**Erişim:** `/admin`

**Güvenlik:** Kullanıcı adı + şifre (bcrypt hash)

## 🔐 Giriş Sistemi

### Login Sayfası (`/admin/login`)

**Form Alanları:**
```typescript
interface LoginForm {
  username: string;
  password: string;
}
```

**Validasyon:**
```typescript
const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});
```

**Authentication Flow:**
```typescript
// app/admin/login/page.tsx
'use client';

async function handleLogin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  
  if (response.ok) {
    // Set cookie
    router.push('/admin');
  } else {
    setError('Geçersiz kullanıcı adı veya şifre');
  }
}
```

**API Route (`/api/admin/login/route.ts`):**
```typescript
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  // Read admin users
  const users = JSON.parse(
    await fs.readFile('data/admin-users.json', 'utf-8')
  );
  
  const user = users.find((u: any) => u.username === username);
  
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  
  if (!isValid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  // Set cookie
  cookies().set('admin-token', generateToken(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  
  return Response.json({ success: true });
}
```

**İlk Kurulum:**
```typescript
// scripts/create-admin.ts
import bcrypt from 'bcryptjs';

const hash = await bcrypt.hash('admin123', 10);

const adminUser = {
  id: '1',
  username: 'admin',
  passwordHash: hash,
};

await fs.writeFile(
  'data/admin-users.json',
  JSON.stringify([adminUser], null, 2)
);
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123` (ilk girişte değiştirilmeli)

---

## 📊 Dashboard Ana Sayfa (`/admin`)

**Layout:**
```
┌─────────────────────────────────────┐
│ Header (Logo, Çıkış)                │
├─────────────────────────────────────┤
│ Sidebar        │ Main Content       │
│                │                    │
│ • Dashboard    │ İstatistikler      │
│ • Site Ayar.   │                    │
│ • Fiyatlar     │ Hızlı Erişim       │
│ • Bölgeler     │                    │
│ • SSS          │ Son Değişiklikler  │
│ • Yorumlar     │                    │
│ • Galeri       │                    │
│ • Hizmetler    │                    │
│ • Neden Biz    │                    │
│ • SMTP         │                    │
│ • SEO          │                    │
└────────────────┴────────────────────┘
```

**İstatistikler (Opsiyonel):**
- Toplam bölge sayısı: 25
- Toplam yorum sayısı: 127
- Toplam SSS sayısı: 60
- Galeri fotoğraf sayısı: 8

**Hızlı Erişim:**
- Site Ayarları
- Fiyat Güncelle
- Yeni Bölge Ekle
- SMTP Test

---

## 🛠️ Admin Sayfaları

### 1. Site Ayarları (`/admin/site-settings`)

**Düzenlenecek Dosya:** `data/site-config.json`

**Form Alanları:**
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
    googleBusinessUrl: string;
  };
}
```

**UI:**
```tsx
<form>
  <Section title="Site Bilgileri">
    <Input label="Domain" name="site.domain" />
    <Input label="Site Adı" name="site.name" />
    <Input label="Site Başlığı" name="site.title" />
    <Textarea label="Açıklama" name="site.description" />
    <TagInput label="Anahtar Kelimeler" name="site.keywords" />
  </Section>
  
  <Section title="İletişim Bilgileri">
    <Input label="Telefon" name="contact.phone" />
    <Input label="WhatsApp" name="contact.whatsapp" />
    <Input label="Email" name="contact.email" />
    <Textarea label="Adres" name="contact.address" />
  </Section>
  
  <Section title="Konum">
    <Input label="Şehir" name="location.city" />
    <Input label="Bölge" name="location.region" />
    <Input label="Enlem" name="location.lat" />
    <Input label="Boylam" name="location.lng" />
  </Section>
  
  <Section title="Sosyal Medya">
    <Input label="Facebook" name="social.facebook" />
    <Input label="Instagram" name="social.instagram" />
    <Input label="Twitter" name="social.twitter" />
    <Input label="LinkedIn" name="social.linkedin" />
  </Section>
  
  <Section title="Google Business">
    <Input label="Google Business URL" name="business.googleBusinessUrl" />
  </Section>
  
  <Button type="submit">Kaydet</Button>
</form>
```

---

### 2. Fiyat Yönetimi (`/admin/prices`)

**Düzenlenecek Dosya:** `data/prices.json`

**Veri Yapısı:**
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
  }>;
}
```

**UI:**

**Base Fiyatlar:**
```tsx
<Table>
  <thead>
    <tr>
      <th>Metreküp (m³)</th>
      <th>Aylık Fiyat (₺)</th>
      <th>İşlem</th>
    </tr>
  </thead>
  <tbody>
    {[1, 2, 3, 5, 10, 20, 30, 50, 100].map((volume) => (
      <tr key={volume}>
        <td>{volume}m³</td>
        <td>
          <Input
            type="number"
            value={prices.base[volume]}
            onChange={(e) => updatePrice(volume, e.target.value)}
          />
        </td>
        <td>
          <Button size="sm">Güncelle</Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
```

**İndirimler:**
```tsx
<Table>
  <thead>
    <tr>
      <th>Süre</th>
      <th>İndirim (%)</th>
      <th>İşlem</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>3 ay</td>
      <td><Input type="number" value={10} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
    <tr>
      <td>6 ay</td>
      <td><Input type="number" value={15} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
    <tr>
      <td>12 ay</td>
      <td><Input type="number" value={20} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
  </tbody>
</Table>
```

**Ek Hizmetler:**
```tsx
<Table>
  <thead>
    <tr>
      <th>Hizmet</th>
      <th>Fiyat (₺)</th>
      <th>İşlem</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Taşıma</td>
      <td><Input type="number" value={300} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
    <tr>
      <td>Montaj/Demontaj</td>
      <td><Input type="number" value={200} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
    <tr>
      <td>Ambalaj Malzemesi</td>
      <td><Input type="number" value={150} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
    <tr>
      <td>Klimalı Depo (ekstra)</td>
      <td><Input type="number" value={100} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
    <tr>
      <td>Sigorta</td>
      <td><Input type="number" value={150} /></td>
      <td><Button>Güncelle</Button></td>
    </tr>
  </tbody>
</Table>
```

**Paket Fiyatlar:**
```tsx
<div className="space-y-4">
  {packages.map((pkg) => (
    <Card key={pkg.id}>
      <Input label="Paket Adı" value={pkg.name} />
      <Input label="Metreküp" type="number" value={pkg.volume} />
      <Input label="Süre (ay)" type="number" value={pkg.duration} />
      <Input label="Fiyat" type="number" value={pkg.price} />
      <Input label="İndirim (%)" type="number" value={pkg.discount} />
      <div className="flex gap-2">
        <Button>Güncelle</Button>
        <Button variant="danger">Sil</Button>
      </div>
    </Card>
  ))}
  <Button>+ Yeni Paket Ekle</Button>
</div>
```

---

### 3. Hizmet Bölgeleri (`/admin/regions`)

**Düzenlenecek Dosya:** `data/regions.json`

**Liste Görünümü:**
```tsx
<Table>
  <thead>
    <tr>
      <th>Bölge Adı</th>
      <th>Slug</th>
      <th>Koordinatlar</th>
      <th>İşlem</th>
    </tr>
  </thead>
  <tbody>
    {regions.map((region) => (
      <tr key={region.id}>
        <td>{region.name}</td>
        <td>{region.slug}</td>
        <td>{region.coordinates.lat}, {region.coordinates.lng}</td>
        <td>
          <Button size="sm" onClick={() => editRegion(region.id)}>
            Düzenle
          </Button>
          <Button size="sm" variant="danger" onClick={() => deleteRegion(region.id)}>
            Sil
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
<Button>+ Yeni Bölge Ekle</Button>
```

**Düzenleme Formu:**
```tsx
<form>
  <Input label="Bölge Adı" name="name" required />
  <Input label="Slug" name="slug" readOnly value={generateSlug(name)} />
  <Textarea label="Açıklama" name="description" rows={3} />
  <Textarea label="İçerik" name="content" rows={10} />
  <Input label="Enlem" name="coordinates.lat" />
  <Input label="Boylam" name="coordinates.lng" />
  
  <div className="flex gap-2">
    <Button type="submit">Kaydet</Button>
    <Button type="button" variant="secondary" onClick={onCancel}>
      İptal
    </Button>
  </div>
</form>
```

**Slug Otomatik Oluşturma:**
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
    .replace(/[^\w-]+/g, '')
    + '-esya-depolama';
}
```

---

### 4. SSS Yönetimi (`/admin/faq`)

**Düzenlenecek Dosya:** `data/faq.json`

**Veri Yapısı:**
```typescript
interface FAQ {
  general: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  regions: Array<{
    regionId: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  }>;
}
```

**Tabs:**
```tsx
<Tabs>
  <Tab label="Genel SSS">
    <FAQList items={faq.general} onEdit={editFAQ} onDelete={deleteFAQ} />
    <Button>+ Yeni Soru Ekle</Button>
  </Tab>
  
  <Tab label="Bölgeye Özel SSS">
    <Select label="Bölge Seç" options={regions} onChange={setSelectedRegion} />
    {selectedRegion && (
      <>
        <FAQList
          items={getRegionFAQ(selectedRegion)}
          onEdit={editFAQ}
          onDelete={deleteFAQ}
        />
        <Button>+ Yeni Soru Ekle</Button>
      </>
    )}
  </Tab>
</Tabs>
```

**SSS Düzenleme:**
```tsx
<form>
  <Textarea label="Soru" name="question" rows={2} required />
  <Textarea label="Cevap" name="answer" rows={5} required />
  <div className="flex gap-2">
    <Button type="submit">Kaydet</Button>
    <Button type="button" variant="secondary" onClick={onCancel}>
      İptal
    </Button>
  </div>
</form>
```

---

### 5. Yorum Yönetimi (`/admin/reviews`)

**Düzenlenecek Dosya:** `data/reviews.json`

**Veri Yapısı:**
```typescript
interface Reviews {
  general: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  regions: Array<{
    regionId: string;
    reviews: Array<{
      id: string;
      name: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  }>;
}
```

**UI (Benzer SSS):**
```tsx
<Tabs>
  <Tab label="Genel Yorumlar">
    <ReviewList items={reviews.general} onEdit={editReview} onDelete={deleteReview} />
    <Button>+ Yeni Yorum Ekle</Button>
  </Tab>
  
  <Tab label="Bölgeye Özel Yorumlar">
    <Select label="Bölge Seç" options={regions} onChange={setSelectedRegion} />
    {selectedRegion && (
      <>
        <ReviewList
          items={getRegionReviews(selectedRegion)}
          onEdit={editReview}
          onDelete={deleteReview}
        />
        <Button>+ Yeni Yorum Ekle</Button>
      </>
    )}
  </Tab>
</Tabs>
```

**Yorum Düzenleme:**
```tsx
<form>
  <Input label="İsim" name="name" required />
  <Select label="Yıldız" name="rating" options={[1, 2, 3, 4, 5]} required />
  <Textarea label="Yorum" name="comment" rows={4} required />
  <Input label="Tarih" name="date" type="date" required />
  <div className="flex gap-2">
    <Button type="submit">Kaydet</Button>
    <Button type="button" variant="secondary" onClick={onCancel}>
      İptal
    </Button>
  </div>
</form>
```

---

### 6. Galeri Yönetimi (`/admin/gallery`)

**Düzenlenecek Dosya:** `data/gallery.json`

**UI:**
```tsx
<div className="grid grid-cols-4 gap-4">
  {gallery.map((image) => (
    <Card key={image.id}>
      <Image src={image.src} alt={image.alt} width={300} height={200} />
      <Input label="Başlık" value={image.title} onChange={updateTitle} />
      <Input label="Alt Text" value={image.alt} onChange={updateAlt} />
      <Button variant="danger" onClick={() => deleteImage(image.id)}>
        Sil
      </Button>
    </Card>
  ))}
</div>

<div className="mt-8">
  <h3>Yeni Fotoğraf Yükle</h3>
  <FileUpload
    accept="image/jpeg,image/png,image/webp"
    maxSize={5 * 1024 * 1024} // 5MB
    onUpload={handleUpload}
  />
</div>
```

**Upload İşlemi:**
```typescript
async function handleUpload(file: File) {
  // 1. Validate
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Dosya boyutu 5MB\'dan büyük olamaz');
  }
  
  // 2. Convert to WebP
  const webpBuffer = await sharp(await file.arrayBuffer())
    .resize(1200, 800, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();
  
  // 3. Save to /public/uploads/gallery/
  const filename = `${Date.now()}-${file.name.replace(/\.[^.]+$/, '.webp')}`;
  const filepath = `/uploads/gallery/${filename}`;
  
  await fs.writeFile(`public${filepath}`, webpBuffer);
  
  // 4. Update gallery.json
  const gallery = JSON.parse(await fs.readFile('data/gallery.json', 'utf-8'));
  gallery.push({
    id: generateId(),
    src: filepath,
    alt: file.name,
    title: file.name,
  });
  await fs.writeFile('data/gallery.json', JSON.stringify(gallery, null, 2));
  
  return filepath;
}
```

---

### 7. Hizmetler (`/admin/services`)

**Düzenlenecek Dosya:** `data/services.json`

**Veri Yapısı:**
```typescript
interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
}
```

**UI:**
```tsx
<div className="space-y-4">
  {services.map((service) => (
    <Card key={service.id}>
      <Select label="İkon" name="icon" options={lucideIcons} value={service.icon} />
      <Input label="Başlık" name="title" value={service.title} />
      <Textarea label="Açıklama" name="description" value={service.description} />
      <div className="flex gap-2">
        <Button onClick={() => updateService(service.id)}>Güncelle</Button>
        <Button variant="danger" onClick={() => deleteService(service.id)}>Sil</Button>
      </div>
    </Card>
  ))}
  <Button>+ Yeni Hizmet Ekle</Button>
</div>
```

---

### 8. Neden Biz (`/admin/features`)

**Düzenlenecek Dosya:** `data/features.json`

**Veri Yapısı:**
```typescript
interface Feature {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
}
```

**UI:** (Hizmetler ile aynı)

---

### 9. SMTP Ayarları (`/admin/smtp`)

**Düzenlenecek Dosya:** `data/smtp-config.json` (şifreli)

**Veri Yapısı:**
```typescript
interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string; // Encrypted
}
```

**UI:**
```tsx
<form>
  <Input label="SMTP Host" name="host" value="smtp.yandex.com" readOnly />
  <Input label="Port" name="port" type="number" value={465} readOnly />
  <Input label="Email" name="user" type="email" required />
  <Input label="Şifre" name="pass" type="password" required />
  
  <div className="flex gap-2">
    <Button type="submit">Kaydet</Button>
    <Button type="button" onClick={testSMTP}>
      Test Email Gönder
    </Button>
  </div>
</form>

{testResult && (
  <Alert variant={testResult.success ? 'success' : 'error'}>
    {testResult.message}
  </Alert>
)}
```

**Test Email:**
```typescript
async function testSMTP() {
  const response = await fetch('/api/admin/smtp/test', {
    method: 'POST',
  });
  
  const result = await response.json();
  setTestResult(result);
}
```

---

### 10. SEO Ayarları (`/admin/seo`)

**Düzenlenecek Dosya:** `data/seo-config.json`

**Veri Yapısı:**
```typescript
interface SEOConfig {
  metaTemplates: {
    home: {
      title: string;
      description: string;
      keywords: string[];
    };
    region: {
      titleTemplate: string; // "[Bölge] Eşya Depolama - [Site]"
      descriptionTemplate: string;
    };
    prices: {
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
  };
}
```

**UI:**
```tsx
<Tabs>
  <Tab label="Meta Templates">
    <Section title="Ana Sayfa">
      <Input label="Title" name="metaTemplates.home.title" />
      <Textarea label="Description" name="metaTemplates.home.description" />
      <TagInput label="Keywords" name="metaTemplates.home.keywords" />
    </Section>
    
    <Section title="Bölge Sayfaları">
      <Input label="Title Template" name="metaTemplates.region.titleTemplate" />
      <Textarea label="Description Template" name="metaTemplates.region.descriptionTemplate" />
      <p className="text-sm text-gray-600">
        Kullanılabilir değişkenler: [Bölge], [Site], [Domain]
      </p>
    </Section>
    
    {/* Diğer sayfalar... */}
  </Tab>
  
  <Tab label="Analytics">
    <Input label="Google Analytics ID" name="analytics.gaId" placeholder="G-XXXXXXXXXX" />
    <Input label="Google Tag Manager ID" name="analytics.gtmId" placeholder="GTM-XXXXXXX" />
  </Tab>
</Tabs>
```

---

## 🔄 Server Actions

**JSON Güncelleme:**
```typescript
// app/admin/actions.ts
'use server';

import fs from 'fs/promises';

export async function updateSiteConfig(data: SiteConfig) {
  await fs.writeFile(
    'data/site-config.json',
    JSON.stringify(data, null, 2)
  );
  
  revalidatePath('/');
  return { success: true };
}

export async function updatePrices(data: PriceData) {
  await fs.writeFile(
    'data/prices.json',
    JSON.stringify(data, null, 2)
  );
  
  revalidatePath('/fiyatlarimiz');
  return { success: true };
}

// ... diğer update fonksiyonları
```

---

## 🎨 Admin UI Components

### Layout
```tsx
// app/admin/layout.tsx
export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
```

### Sidebar
```tsx
const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/site-settings', label: 'Site Ayarları', icon: Settings },
  { href: '/admin/prices', label: 'Fiyatlar', icon: DollarSign },
  { href: '/admin/regions', label: 'Bölgeler', icon: MapPin },
  { href: '/admin/faq', label: 'SSS', icon: HelpCircle },
  { href: '/admin/reviews', label: 'Yorumlar', icon: Star },
  { href: '/admin/gallery', label: 'Galeri', icon: Image },
  { href: '/admin/services', label: 'Hizmetler', icon: Package },
  { href: '/admin/features', label: 'Neden Biz', icon: CheckCircle },
  { href: '/admin/smtp', label: 'SMTP', icon: Mail },
  { href: '/admin/seo', label: 'SEO', icon: Search },
];
```

---

## 🔐 Middleware (Auth)

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

## 📊 JSON Dosya Yapısı

### data/admin-users.json
```json
[
  {
    "id": "1",
    "username": "admin",
    "passwordHash": "$2a$10$..."
  }
]
```

### Tüm JSON Dosyaları
- `site-config.json`
- `prices.json`
- `services.json`
- `features.json`
- `regions.json`
- `faq.json`
- `reviews.json`
- `gallery.json`
- `smtp-config.json`
- `seo-config.json`
- `admin-users.json`

---

## ✅ Admin Panel Checklist

- [x] Login sistemi (bcrypt)
- [x] Dashboard
- [x] Site ayarları
- [x] Fiyat yönetimi
- [x] Bölge yönetimi
- [x] SSS yönetimi
- [x] Yorum yönetimi
- [x] Galeri yönetimi
- [x] Hizmetler
- [x] Neden Biz
- [x] SMTP ayarları + test
- [x] SEO ayarları
- [x] Logout
- [x] Responsive design
- [x] Güvenlik (middleware)
