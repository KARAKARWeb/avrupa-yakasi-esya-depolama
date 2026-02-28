# Tasarım Rehberi

Eşya depolama web sitesi için tasarım sistemi, renkler, tipografi ve UI component'leri.

## 🎨 Renk Paleti

### Ana Renkler

**Primary (Mavi):**
```css
--primary: #0066CC;
--primary-dark: #0052A3;
--primary-light: #3385D6;
```
- Kullanım: Ana butonlar, linkler, vurgular
- Anlamı: Güven, profesyonellik, güvenlik

**Secondary (Koyu Mavi):**
```css
--secondary: #003D7A;
--secondary-dark: #002952;
--secondary-light: #005AA3;
```
- Kullanım: Başlıklar, önemli metinler
- Anlamı: Ciddiyet, güvenilirlik

**Accent (Turuncu):**
```css
--accent: #FF6B35;
--accent-dark: #E55A2B;
--accent-light: #FF8555;
```
- Kullanım: CTA butonları, önemli bilgiler, vurgular
- Anlamı: Enerji, dikkat çekme, aksiyon

### Nötr Renkler

**Beyaz & Gri Tonları:**
```css
--white: #FFFFFF;
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

**Kullanım:**
- `--white`: Arka planlar, kartlar
- `--gray-50, --gray-100`: Alternatif bölüm arka planları
- `--gray-500, --gray-600`: Metinler
- `--gray-800, --gray-900`: Başlıklar

### Durum Renkleri

**Başarı (Yeşil):**
```css
--success: #10B981;
--success-light: #D1FAE5;
```

**Hata (Kırmızı):**
```css
--error: #EF4444;
--error-light: #FEE2E2;
```

**Uyarı (Sarı):**
```css
--warning: #F59E0B;
--warning-light: #FEF3C7;
```

**Bilgi (Mavi):**
```css
--info: #3B82F6;
--info-light: #DBEAFE;
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          dark: '#0052A3',
          light: '#3385D6',
        },
        secondary: {
          DEFAULT: '#003D7A',
          dark: '#002952',
          light: '#005AA3',
        },
        accent: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2B',
          light: '#FF8555',
        },
      },
    },
  },
};
```

---

## 📝 Tipografi

### Font Ailesi

**Inter (Self-Hosted):**
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

**Kullanım:**
```css
font-family: var(--font-inter), sans-serif;
```

### Font Boyutları

```css
/* Başlıklar */
--text-h1: 48px;      /* Mobil: 32px */
--text-h2: 36px;      /* Mobil: 28px */
--text-h3: 24px;      /* Mobil: 20px */
--text-h4: 20px;      /* Mobil: 18px */

/* Metinler */
--text-base: 16px;
--text-lg: 18px;
--text-sm: 14px;
--text-xs: 12px;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Tailwind Classes

```tsx
<h1 className="text-4xl md:text-5xl font-bold">
  Ana Başlık
</h1>

<h2 className="text-3xl md:text-4xl font-bold">
  Alt Başlık
</h2>

<h3 className="text-2xl md:text-3xl font-semibold">
  Bölüm Başlığı
</h3>

<p className="text-base text-gray-600">
  Normal metin
</p>

<p className="text-sm text-gray-500">
  Küçük metin
</p>
```

### Line Height

```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## 🧱 Layout & Spacing

### Container

```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* İçerik */}
</div>
```

**Breakpoints:**
- `max-w-7xl`: 1280px
- `px-4`: 16px yatay padding (mobil)
- `md:px-6`: 24px (tablet)
- `lg:px-8`: 32px (desktop)

### Section Spacing

```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    {/* İçerik */}
  </div>
</section>
```

**Vertical Spacing:**
- `py-16`: 64px (mobil)
- `md:py-24`: 96px (desktop)

### Grid System

```tsx
{/* 3 sütun (tablet: 2, mobil: 1) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

{/* 2 sütun */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <div>{/* Sol */}</div>
  <div>{/* Sağ */}</div>
</div>
```

### Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

---

## 🎯 Component Styles

### Butonlar

**Primary Button:**
```tsx
<button className="
  bg-primary hover:bg-primary-dark
  text-white font-semibold
  px-6 py-3 rounded-lg
  transition-all duration-300
  hover:shadow-lg hover:-translate-y-0.5
">
  Hemen Teklif Al
</button>
```

**Secondary Button:**
```tsx
<button className="
  bg-white hover:bg-gray-50
  text-primary border-2 border-primary
  font-semibold px-6 py-3 rounded-lg
  transition-all duration-300
">
  Daha Fazla Bilgi
</button>
```

**Accent Button (CTA):**
```tsx
<button className="
  bg-accent hover:bg-accent-dark
  text-white font-bold
  px-8 py-4 rounded-lg
  transition-all duration-300
  hover:shadow-xl hover:scale-105
">
  Fiyat Hesapla
</button>
```

**Icon Button:**
```tsx
<button className="
  bg-primary text-white
  p-4 rounded-full
  shadow-lg hover:shadow-xl
  transition-all duration-300
  hover:scale-110
">
  <Phone className="w-6 h-6" />
</button>
```

### Kartlar

**Basic Card:**
```tsx
<div className="
  bg-white rounded-lg shadow-md
  p-6 hover:shadow-xl
  transition-all duration-300
  hover:-translate-y-1
">
  {/* İçerik */}
</div>
```

**Service Card:**
```tsx
<div className="
  bg-white rounded-lg shadow-md
  p-8 text-center
  hover:shadow-xl hover:-translate-y-2
  transition-all duration-300
">
  <div className="
    w-16 h-16 mx-auto mb-4
    bg-primary/10 rounded-full
    flex items-center justify-center
  ">
    <Icon className="w-8 h-8 text-primary" />
  </div>
  <h3 className="text-xl font-semibold mb-2">
    {title}
  </h3>
  <p className="text-gray-600">
    {description}
  </p>
</div>
```

**Review Card:**
```tsx
<div className="
  bg-white rounded-lg shadow-md
  p-6
">
  <div className="flex gap-1 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
  <p className="text-gray-700 italic mb-4">
    "{comment}"
  </p>
  <p className="text-sm text-gray-500">
    {name} - {date}
  </p>
</div>
```

### Form Elements

**Input:**
```tsx
<input
  type="text"
  className="
    w-full px-4 py-3
    border border-gray-300 rounded-lg
    focus:border-primary focus:ring-2 focus:ring-primary/20
    outline-none transition-all
  "
  placeholder="Adınız Soyadınız"
/>
```

**Select:**
```tsx
<select className="
  w-full px-4 py-3
  border border-gray-300 rounded-lg
  focus:border-primary focus:ring-2 focus:ring-primary/20
  outline-none transition-all
  bg-white
">
  <option>Seçiniz</option>
</select>
```

**Textarea:**
```tsx
<textarea
  className="
    w-full px-4 py-3
    border border-gray-300 rounded-lg
    focus:border-primary focus:ring-2 focus:ring-primary/20
    outline-none transition-all
    resize-none
  "
  rows={5}
  placeholder="Mesajınız"
/>
```

**Checkbox:**
```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="
      w-5 h-5 rounded
      border-gray-300
      text-primary
      focus:ring-primary
    "
  />
  <span className="text-gray-700">Taşıma Hizmeti</span>
</label>
```

### Accordion

```tsx
<div className="border-b border-gray-200">
  <button className="
    w-full py-4 px-6
    flex items-center justify-between
    text-left font-semibold
    hover:bg-gray-50
    transition-colors
  ">
    <span>{question}</span>
    <ChevronDown className="w-5 h-5 transition-transform" />
  </button>
  <div className="px-6 pb-4 text-gray-600">
    {answer}
  </div>
</div>
```

### Badge

```tsx
<span className="
  inline-flex items-center
  px-3 py-1 rounded-full
  text-sm font-medium
  bg-primary/10 text-primary
">
  Yeni
</span>

<span className="
  inline-flex items-center
  px-3 py-1 rounded-full
  text-sm font-medium
  bg-green-100 text-green-800
">
  Stokta Var
</span>
```

---

## 🖼️ Bölüm Tasarımları

### Hero Section

```tsx
<section className="
  relative py-20 md:py-32
  bg-gradient-to-br from-blue-50 to-white
">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Sol: İçerik */}
      <div>
        <h1 className="
          text-4xl md:text-5xl lg:text-6xl
          font-bold text-gray-900 mb-6
        ">
          Avrupa Yakası Eşya Depolama
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Güvenli ve uygun fiyatlı self storage hizmeti
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="accent">Fiyat Hesapla</Button>
          <Button variant="secondary">Hemen Teklif Al</Button>
        </div>
      </div>
      
      {/* Sağ: Form */}
      <div className="
        bg-white rounded-2xl shadow-2xl
        p-8
      ">
        <PriceCalculator />
      </div>
    </div>
  </div>
</section>
```

### Services Section

```tsx
<section className="py-16 md:py-24 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Hizmetlerimiz
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Tüm eşya depolama ihtiyaçlarınız için profesyonel çözümler
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  </div>
</section>
```

### Pricing Table

```tsx
<section className="py-16 md:py-24 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Fiyatlarımız
    </h2>
    
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-6 py-4 text-left">Metreküp</th>
            <th className="px-6 py-4 text-right">1 Ay</th>
            <th className="px-6 py-4 text-right">3 Ay</th>
            <th className="px-6 py-4 text-right">6 Ay</th>
            <th className="px-6 py-4 text-right">1 Yıl</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows */}
        </tbody>
      </table>
    </div>
  </div>
</section>
```

### FAQ Section

```tsx
<section className="py-16 md:py-24 bg-white">
  <div className="container mx-auto px-4 max-w-4xl">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Sık Sorulan Sorular
    </h2>
    
    <div className="space-y-4">
      {faq.map(item => (
        <AccordionItem key={item.id} {...item} />
      ))}
    </div>
  </div>
</section>
```

---

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

### Mobile-First Approach

```tsx
{/* Mobil: 1 sütun, Tablet: 2 sütun, Desktop: 3 sütun */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* Mobil: text-sm, Desktop: text-base */}
<p className="text-sm md:text-base">

{/* Mobil: gizli, Desktop: görünür */}
<div className="hidden lg:block">

{/* Mobil: görünür, Desktop: gizli */}
<div className="block lg:hidden">
```

### Touch-Friendly

```css
/* Minimum 44×44px touch target */
.btn {
  min-height: 44px;
  min-width: 44px;
}
```

---

## 🎭 Animasyonlar

### Hover Effects

```tsx
{/* Card hover */}
<div className="
  transition-all duration-300
  hover:shadow-xl hover:-translate-y-1
">

{/* Button hover */}
<button className="
  transition-all duration-300
  hover:scale-105 hover:shadow-lg
">

{/* Icon hover */}
<div className="
  transition-transform duration-300
  hover:rotate-12
">
```

### Fade In

```tsx
<div className="
  opacity-0 animate-fade-in
">
```

```javascript
// tailwind.config.js
animation: {
  'fade-in': 'fadeIn 0.5s ease-in forwards',
}
keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
}
```

### Smooth Scroll

```tsx
<Link href="#fiyatlar" className="scroll-smooth">
  Fiyatları Gör
</Link>
```

```css
html {
  scroll-behavior: smooth;
}
```

---

## 🖼️ Görseller

### Image Component

```tsx
import Image from 'next/image';

<Image
  src="/images/depo.jpg"
  alt="Eşya Depolama"
  width={1200}
  height={800}
  className="rounded-lg"
  priority={isHero}
  quality={85}
/>
```

### Aspect Ratios

```tsx
{/* 16:9 */}
<div className="relative aspect-video">
  <Image src="..." alt="..." fill className="object-cover" />
</div>

{/* 1:1 (Square) */}
<div className="relative aspect-square">
  <Image src="..." alt="..." fill className="object-cover" />
</div>

{/* 4:3 */}
<div className="relative aspect-4/3">
  <Image src="..." alt="..." fill className="object-cover" />
</div>
```

---

## 🎨 İkonlar (Lucide)

### Kullanım

```tsx
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

<Shield className="w-6 h-6 text-primary" />
<Phone className="w-5 h-5" />
```

### İkon Listesi

**Hizmetler:**
- `Home` - Ev eşyası
- `Briefcase` - Ofis eşyası
- `Archive` - Arşiv
- `Car` - Araç
- `Truck` - Taşıma
- `Package` - Paketleme

**Özellikler:**
- `Shield` - Güvenlik
- `Lock` - Sigorta
- `Camera` - Kamera
- `Thermometer` - Klimalı
- `DollarSign` - Fiyat
- `Clock` - 7/24

**UI:**
- `Phone` - Telefon
- `Mail` - Email
- `MessageCircle` - WhatsApp
- `MapPin` - Konum
- `Star` - Yıldız
- `ChevronDown` - Dropdown
- `Menu` - Hamburger
- `X` - Kapat

---

## 🎯 Sticky Elements

### Sticky Header

```tsx
<header className="
  sticky top-0 z-50
  bg-white shadow-md
">
```

### Sticky Buttons (Sağ Alt)

```tsx
<div className="
  fixed bottom-4 right-4 z-50
  flex flex-col gap-2
">
  <a href="tel:+905321384979" className="
    bg-primary text-white
    p-4 rounded-full shadow-lg
    hover:scale-110 transition-transform
  ">
    <Phone className="w-6 h-6" />
  </a>
  
  <a href="https://wa.me/905321384979" className="
    bg-green-500 text-white
    p-4 rounded-full shadow-lg
    hover:scale-110 transition-transform
  ">
    <MessageCircle className="w-6 h-6" />
  </a>
</div>
```

---

## 🌈 Gradient Backgrounds

```tsx
{/* Blue gradient */}
<div className="bg-gradient-to-br from-blue-50 to-white">

{/* Primary gradient */}
<div className="bg-gradient-to-r from-primary to-primary-dark">

{/* Accent gradient */}
<div className="bg-gradient-to-r from-accent to-accent-dark">
```

---

## 📐 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

```tsx
<div className="rounded-lg">      {/* 12px */}
<div className="rounded-xl">      {/* 16px */}
<div className="rounded-2xl">     {/* 24px */}
<div className="rounded-full">    {/* 9999px */}
```

---

## 🎨 Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

```tsx
<div className="shadow-md">
<div className="shadow-lg hover:shadow-xl">
<div className="shadow-2xl">
```

---

## ✅ Design Checklist

### Renkler
- [x] Primary: #0066CC
- [x] Secondary: #003D7A
- [x] Accent: #FF6B35
- [x] Nötr: Beyaz, Gri tonları
- [x] Durum: Yeşil, Kırmızı, Sarı

### Tipografi
- [x] Font: Inter (self-hosted)
- [x] H1: 48px (mobil: 32px)
- [x] H2: 36px (mobil: 28px)
- [x] Body: 16px
- [x] Line height: 1.5

### Layout
- [x] Container: max-w-7xl
- [x] Section padding: py-16 md:py-24
- [x] Grid: responsive (1/2/3 sütun)
- [x] Mobile-first

### Components
- [x] Butonlar (primary, secondary, accent)
- [x] Kartlar (hover effects)
- [x] Form elements
- [x] Accordion
- [x] Badge

### Responsive
- [x] Breakpoints: sm, md, lg, xl, 2xl
- [x] Touch-friendly (min 44px)
- [x] Mobil menü (hamburger)

### Animasyonlar
- [x] Hover effects
- [x] Smooth scroll
- [x] Transitions (300ms)
- [x] Minimal (performans için)

### Accessibility
- [x] Contrast ratio (WCAG AA)
- [x] Focus states
- [x] Alt texts
- [x] Semantic HTML
