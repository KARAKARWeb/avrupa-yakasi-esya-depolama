import { getSiteConfig, updateSiteConfig } from '@/lib/actions/site-config';
import SiteConfigForm from '@/components/admin/SiteConfigForm';

export default async function SiteSettingsPage() {
  const config = await getSiteConfig();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Ayarları</h1>
        <p className="text-gray-600 mt-1">Sitenizin genel ayarlarını yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <SiteConfigForm config={config} updateAction={updateSiteConfig} />
      </div>
    </div>
  );
}
