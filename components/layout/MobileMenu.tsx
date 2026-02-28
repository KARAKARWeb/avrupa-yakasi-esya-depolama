'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Phone, MessageCircle, ChevronDown } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  slug: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  whatsapp: string;
  regions: Region[];
}

export default function MobileMenu({ isOpen, onClose, phone, whatsapp, regions }: MobileMenuProps) {
  const [regionsOpen, setRegionsOpen] = useState(false);

  if (!isOpen) return null;

  const phoneDisplay = phone.replace(/\s/g, '').replace(/^(\+90)/, '0');
  const whatsappClean = whatsapp.replace(/\s/g, '');

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-xl md:hidden overflow-y-auto">
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menüyü Kapat"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Menu Items */}
          <nav className="mt-12 space-y-2">
            <Link
              href="/"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Ana Sayfa
            </Link>
            
            <Link
              href="/hakkimizda"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Hakkımızda
            </Link>

            {/* Regions Dropdown */}
            <div>
              <button
                onClick={() => setRegionsOpen(!regionsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span>Bölgeler</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${regionsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {regionsOpen && (
                <div className="ml-4 mt-2 space-y-1 max-h-64 overflow-y-auto">
                  <Link
                    href="/hizmet-bolgeleri"
                    onClick={onClose}
                    className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Tüm Bölgeler
                  </Link>
                  {regions.map((region) => (
                    <Link
                      key={region.id}
                      href={`/${region.slug}`}
                      onClick={onClose}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {region.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/iletisim"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              İletişim
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors w-full"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">{phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors w-full"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
