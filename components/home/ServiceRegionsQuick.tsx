import Link from 'next/link';
import { MapPin, ChevronDown } from 'lucide-react';

interface ServiceRegion {
  name: string;
  slug: string;
}

interface ServiceRegionsQuickProps {
  regions: ServiceRegion[];
}

export default function ServiceRegionsQuick({ regions }: ServiceRegionsQuickProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Hizmet Bölgeleri
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/${region.slug}`}
              className="flex items-center gap-2 p-1.5 sm:p-2 sm:gap-3 bg-white hover:bg-primary/5 border-2 border-gray-100 hover:border-primary rounded-xl transition-all duration-300 group"
            >
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-primary transition-colors" style={{ fontSize: '0.700rem' }}>
                {region.name}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link
            href="/hizmet-bolgeleri"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            <span>Tümünü Görüntüle</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
