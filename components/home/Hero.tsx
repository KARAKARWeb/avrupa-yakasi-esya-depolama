'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import PriceCalculator from '@/components/forms/PriceCalculator';
import { Shield, Camera, Lock, ClipboardList, LogIn, DoorOpen, FileText, Flame, Droplets, Calendar, CheckCircle, Eye } from 'lucide-react';

interface HeroProps {
  title?: string;
  mainHeading: string;
  description: string;
  trustBadges?: Array<{
    icon: string;
    text: string;
    description: string;
  }>;
  config: any;
  prices: any;
  formSettings?: any;
}

export default function Hero({ title, mainHeading, description, trustBadges, config, prices, formSettings }: HeroProps) {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const iconMap: Record<string, any> = {
    FileText, Shield, Camera, Lock, ClipboardList, LogIn, DoorOpen, Flame, Droplets, Calendar, CheckCircle, Eye
  };

  return (
    <section className="relative pt-8 pb-12 md:py-32 overflow-hidden">
      {/* Arka Plan Resmi */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/images/hero-bg.webp)',
          backgroundPosition: 'left center'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Başlık ve Açıklama - Glassmorphism */}
            <div 
              className="rounded-2xl p-8 backdrop-blur-2xl mb-8"
              style={{
                background: 'rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
              }}
            >
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {mainHeading}
              </h1>
              <p className="text-lg md:text-xl text-gray-100">
                {description}
              </p>
            </div>

            {/* Güven Rozetleri */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {trustBadges?.map((badge, index) => {
                const Icon = iconMap[badge.icon] || FileText;
                // Mobilde: çift sütun - sağ sütundaki öğeler için right-0
                const isRightColumn = index % 2 === 1;
                // Desktop: 3 sütun - sağ sütundaki öğeler için right-0
                const isRightColumnDesktop = index % 3 === 2;
                
                return (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredBadge(index)}
                    onMouseLeave={() => setHoveredBadge(null)}
                  >
                    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 shadow-sm border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-help">
                      <div className="bg-primary/10 p-1.5 rounded-md">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">
                        {badge.text}
                      </span>
                    </div>
                    
                    {/* Tooltip */}
                    {hoveredBadge === index && (
                      <div 
                        className={`absolute z-50 bottom-full mb-2 w-[calc(100vw-2rem)] max-w-[280px] md:w-64 p-4 bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 backdrop-blur-md backdrop-saturate-150 text-gray-900 text-xs rounded-xl shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                          isRightColumn ? 'right-0' : 'left-0'
                        } ${
                          isRightColumnDesktop ? 'md:right-0 md:left-auto' : 'md:left-1/2 md:transform md:-translate-x-1/2'
                        }`}
                        style={{ backdropFilter: 'blur(12px) saturate(150%)' }}
                      >
                        <p className="leading-relaxed text-gray-900 font-semibold">{badge.description}</p>
                        <div className={`absolute top-full -mt-1 ${
                          isRightColumn ? 'right-4' : 'left-4'
                        } ${
                          isRightColumnDesktop ? 'md:right-4 md:left-auto' : 'md:left-1/2 md:transform md:-translate-x-1/2'
                        }`}>
                          <div className="border-[6px] border-transparent border-t-gray-900/98"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <PriceCalculator prices={prices} config={config} formSettings={formSettings} />
          </div>
        </div>
      </div>
    </section>
  );
}
