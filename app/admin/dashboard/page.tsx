import { readFile } from 'fs/promises';
import { join } from 'path';
import Link from 'next/link';
import { LayoutDashboard, MapPin, HelpCircle, Star, Image as ImageIcon, Settings, DollarSign, Package, CheckCircle, Mail, Search } from 'lucide-react';

async function getDashboardStats() {
  const dataDir = join(process.cwd(), 'data');
  
  try {
    const [regions, faq, reviews, gallery] = await Promise.all([
      readFile(join(dataDir, 'regions.json'), 'utf-8').then(JSON.parse),
      readFile(join(dataDir, 'faq.json'), 'utf-8').then(JSON.parse),
      readFile(join(dataDir, 'reviews.json'), 'utf-8').then(JSON.parse),
      readFile(join(dataDir, 'gallery.json'), 'utf-8').then(JSON.parse),
    ]);

    return {
      totalRegions: regions.regions?.length || 0,
      totalFAQ: faq.faqs?.length || 0,
      totalReviews: reviews.reviews?.length || 0,
      totalGallery: gallery.images?.length || 0,
    };
  } catch (error) {
    return {
      totalRegions: 0,
      totalFAQ: 0,
      totalReviews: 0,
      totalGallery: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: 'Toplam Bölge', value: stats.totalRegions, icon: MapPin, color: 'bg-blue-500' },
    { label: 'SSS Sayısı', value: stats.totalFAQ, icon: HelpCircle, color: 'bg-green-500' },
    { label: 'Yorum Sayısı', value: stats.totalReviews, icon: Star, color: 'bg-yellow-500' },
    { label: 'Galeri Görseli', value: stats.totalGallery, icon: ImageIcon, color: 'bg-purple-500' },
  ];

  const quickLinks = [
    { label: 'Site Ayarları', href: '/admin/site-ayarlari', icon: Settings, color: 'text-blue-600' },
    { label: 'Fiyat Yönetimi', href: '/admin/fiyatlar', icon: DollarSign, color: 'text-green-600' },
    { label: 'Bölgeler', href: '/admin/bolgeler', icon: MapPin, color: 'text-purple-600' },
    { label: 'SSS', href: '/admin/sss', icon: HelpCircle, color: 'text-orange-600' },
    { label: 'Yorumlar', href: '/admin/yorumlar', icon: Star, color: 'text-yellow-600' },
    { label: 'Galeri', href: '/admin/galeri', icon: ImageIcon, color: 'text-pink-600' },
    { label: 'Hizmetler', href: '/admin/hizmetler', icon: Package, color: 'text-indigo-600' },
    { label: 'Neden Biz', href: '/admin/neden-biz', icon: CheckCircle, color: 'text-teal-600' },
    { label: 'SMTP', href: '/admin/smtp', icon: Mail, color: 'text-red-600' },
    { label: 'SEO', href: '/admin/seo', icon: Search, color: 'text-gray-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Yönetim paneline hoş geldiniz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <Icon className={`w-8 h-8 ${link.color} mb-2`} />
                <p className="text-sm font-medium text-gray-900">{link.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
