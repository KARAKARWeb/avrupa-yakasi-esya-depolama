import { promises as fs } from 'fs';
import path from 'path';
import PageHeader from '@/components/ui/PageHeader';
import { getSiteConfig } from '@/lib/data';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);
  const seoSettings = settings.seoSettings?.about || {};
  
  return {
    title: seoSettings.title || 'Hakkımızda',
    description: seoSettings.description || 'Eşya depolama sektöründe güvenilir ve profesyonel hizmet',
    keywords: seoSettings.keywords || '',
  };
}

export default async function HakkimizdaPage() {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);
  const aboutUs = settings.aboutUs || {};
  const config = await getSiteConfig();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Hakkımızda"
        description={settings?.pageHeaders?.hakkimizda || "Eşya depolama sektöründe güvenilir ve profesyonel hizmet"}
        breadcrumbs={[{ label: 'Hakkımızda' }]}
        siteName={config.site.name}
      />

      {/* Giriş */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hakkımızda</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {aboutUs.intro || 'Avrupa Yakası Eşya Depolama olarak, İstanbul\'da 15 yılı aşkın tecrübemizle eşya depolama sektöründe hizmet vermekteyiz. Modern tesislerimiz ve profesyonel ekibimizle müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vizyon ve Misyon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Vizyon */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {aboutUs.vision?.title || 'Vizyonumuz'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {aboutUs.vision?.content || 'Türkiye\'nin en güvenilir ve tercih edilen eşya depolama şirketi olmak. Müşteri memnuniyetini ön planda tutarak, sektörde standartları belirleyen bir marka olmayı hedefliyoruz.'}
              </p>
            </div>

            {/* Misyon */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {aboutUs.mission?.title || 'Misyonumuz'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {aboutUs.mission?.content || 'Müşterilerimizin eşyalarını en güvenli şekilde korumak, uygun fiyatlarla kaliteli hizmet sunmak ve her zaman ulaşılabilir olmak. Modern teknoloji ve deneyimli ekibimizle, eşya depolama süreçlerini kolaylaştırmak.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Değerler */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {aboutUs.values?.title || 'Değerlerimiz'}
              </h2>
              <div className="space-y-3">
                {(aboutUs.values?.items || [
                  'Güvenilirlik ve şeffaflık',
                  'Müşteri memnuniyeti odaklılık',
                  'Profesyonellik ve kalite',
                  'Sürekli gelişim ve yenilikçilik',
                  'Çevre ve toplum sorumluluğu'
                ]).map((value: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
