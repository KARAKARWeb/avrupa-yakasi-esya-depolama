import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  slug: string;
  district: string;
}

interface ServiceRegionsProps {
  regions: Region[];
}

export default function ServiceRegions({ regions }: ServiceRegionsProps) {
  return (
    <section id="hizmet-bolgeleri" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hizmet Bölgelerimiz</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İstanbul genelinde 39 farklı bölgede profesyonel eşya depolama hizmeti sunuyoruz
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {regions.map((region) => (
            <Link
              key={region.id}
              href={`/${region.slug}`}
              className="flex items-center gap-2 p-1.5 sm:p-4 sm:gap-3 bg-white hover:bg-primary/5 border-2 border-gray-100 hover:border-primary rounded-xl transition-all duration-300 group"
            >
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                {region.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
