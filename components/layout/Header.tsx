'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, MessageCircle, ChevronDown } from 'lucide-react';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  siteName: string;
  phone: string;
  whatsapp: string;
  regions: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export default function Header({ siteName, phone, whatsapp, regions }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);

  const phoneDisplay = phone.replace(/\s/g, '').replace(/^(\+90)/, '0').replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  const whatsappClean = whatsapp.replace(/\s/g, '');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.webp" 
                alt={siteName}
                width={1000}
                height={253}
                className="object-contain h-14 w-auto"
                quality={100}
                priority
                unoptimized
              />
            </Link>

            <nav className="hidden md:flex items-center justify-center gap-6 flex-1">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hakkimizda" className="text-gray-700 hover:text-primary transition-colors">
              Hakkımızda
            </Link>
            
            {/* Hizmet Bölgeleri Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setRegionsOpen(true)}
                onMouseLeave={() => setRegionsOpen(false)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors"
              >
                <Link href="/hizmet-bolgeleri" className="hover:text-primary transition-colors">
                  Hizmet Bölgeleri
                </Link>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {regionsOpen && (
                <div
                  onMouseEnter={() => setRegionsOpen(true)}
                  onMouseLeave={() => setRegionsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto"
                >
                  <Link
                    href="/hizmet-bolgeleri"
                    className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-50 transition-colors"
                  >
                    Tüm Bölgeler
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  {regions.map((region) => (
                    <Link
                      key={region.id}
                      href={`/${region.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      {region.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/iletisim" className="text-gray-700 hover:text-primary transition-colors">
              İletişim
            </Link>
            </nav>

              <div className="hidden md:flex items-center gap-3">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
              aria-label="Menü"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        phone={phone}
        whatsapp={whatsapp}
        regions={regions}
      />
    </>
  );
}
