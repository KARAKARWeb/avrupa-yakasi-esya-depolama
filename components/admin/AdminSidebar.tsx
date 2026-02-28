'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Image, 
  Settings, 
  Users, 
  MapPin, 
  Info, 
  Heading, 
  Search,
  DollarSign,
  Star,
  Mail
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/sayfa-ayarlari', label: 'Ana Sayfa Ayarları', icon: FileText },
  { href: '/admin/dashboard/hakkimizda-ayarlari', label: 'Hakkımızda Ayarları', icon: Info },
  { href: '/admin/dashboard/baslik-ayarlari', label: 'Başlık Ayarları', icon: Heading },
  { href: '/admin/dashboard/seo-ayarlari', label: 'SEO Ayarları', icon: Search },
  { href: '/admin/site-ayarlari', label: 'Site Ayarları', icon: Settings },
  { href: '/admin/fiyatlar', label: 'Fiyatlar', icon: DollarSign },
  { href: '/admin/bolgeler', label: 'Bölgeler', icon: MapPin },
  { href: '/admin/yorumlar', label: 'Yorumlar', icon: Star },
  { href: '/admin/galeri', label: 'Galeri', icon: Image },
  { href: '/admin/smtp', label: 'SMTP', icon: Mail },
];

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Yönetim Paneli</p>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
