import { getSEO, updateSEO } from '@/lib/actions/seo';
import SEOForm from '@/components/admin/SEOForm';

export default async function SEOPage() {
  const seo = await getSEO();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Ayarları</h1>
        <p className="text-gray-600 mt-1">Arama motoru optimizasyonu ayarlarını yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <SEOForm seo={seo} updateAction={updateSEO} />
      </div>
    </div>
  );
}
