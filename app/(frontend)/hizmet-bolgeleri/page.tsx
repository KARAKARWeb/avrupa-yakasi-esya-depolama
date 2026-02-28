import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import { MapPin } from 'lucide-react';
import regionsData from '@/data/regions.json';
import siteConfig from '@/data/site-config.json';
import { promises as fs } from 'fs';
import path from 'path';

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);
  const seoSettings = settings.seoSettings?.regions || {};
  
  return {
    title: seoSettings.title || 'Hizmet Bölgeleri',
    description: seoSettings.description || 'İstanbul Avrupa Yakası\'nda güvenli eşya depolama hizmeti',
    keywords: seoSettings.keywords || '',
  };
}

export default async function HizmetBolgeleriPage() {
  const regions = regionsData.regions;
  
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'İstanbul Avrupa Yakası Eşya Depolama Hizmetleri',
    description: 'İstanbul Avrupa Yakası\'nda 26 farklı ilçede güvenli ve uygun fiyatlı eşya depolama hizmeti.',
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.site.name,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
    },
    areaServed: regions.map((region) => ({
      '@type': 'City',
      name: region.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        title="Hizmet Bölgelerimiz"
        description={settings?.pageHeaders?.hizmetBolgeleri || "İstanbul'un tüm ilçelerinde profesyonel eşya depolama hizmeti"}
        breadcrumbs={[{ label: 'Hizmet Bölgeleri' }]}
        siteName={siteConfig.site.name}
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {regions.map((region) => (
              <Link
                key={region.id}
                href={`/${region.slug}`}
                className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300 block group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {region.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      İstanbul
                    </p>
                    <span className="text-primary hover:text-primary/80 text-sm font-semibold inline-flex items-center gap-1 transition-colors">
                      Bölgeyi İncele
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
