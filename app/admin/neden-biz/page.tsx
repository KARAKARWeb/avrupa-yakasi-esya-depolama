import { getFeatures, updateFeatures } from '@/lib/actions/features';
import FeaturesForm from '@/components/admin/FeaturesForm';

export default async function FeaturesPage() {
  const data = await getFeatures();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Neden Biz Yönetimi</h1>
        <p className="text-gray-600 mt-1">Özelliklerinizi ve avantajlarınızı yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <FeaturesForm features={data.features} updateAction={updateFeatures} />
      </div>
    </div>
  );
}
