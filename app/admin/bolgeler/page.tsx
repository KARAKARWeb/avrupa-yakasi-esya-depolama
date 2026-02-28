import { getRegions } from '@/lib/actions/regions';
import Link from 'next/link';
import { Edit } from 'lucide-react';

export default async function RegionsPage() {
  const data = await getRegions();
  const regions = data.regions || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bölge Yönetimi</h1>
        <p className="text-gray-600 mt-1">Toplam {regions.length} bölge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((region: any) => (
          <div key={region.slug} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{region.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{region.slug}</p>
            <Link
              href={`/admin/bolgeler/${region.slug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <Edit size={16} />
              Düzenle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
