import { getServices, updateServices } from '@/lib/actions/services';
import ServicesForm from '@/components/admin/ServicesForm';

export default async function ServicesPage() {
  const data = await getServices();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hizmetler Yönetimi</h1>
        <p className="text-gray-600 mt-1">Sunduğunuz hizmetleri yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ServicesForm services={data.services} updateAction={updateServices} />
      </div>
    </div>
  );
}
