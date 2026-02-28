import { getRegion, updateRegion } from '@/lib/actions/regions';
import { notFound } from 'next/navigation';
import RegionEditForm from '@/components/admin/RegionEditForm';

export default async function RegionEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = await getRegion(slug);

  if (!region) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bölge Düzenle: {region.name}</h1>
        <p className="text-gray-600 mt-1">Bölge bilgilerini güncelleyin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <RegionEditForm region={region} updateAction={updateRegion} />
      </div>
    </div>
  );
}
