import { getSiteConfig, getRegions } from '@/lib/data';
import Header from './Header';

export default async function HeaderWrapper() {
  const config = await getSiteConfig();
  const regions = await getRegions();

  return (
    <Header
      siteName={config.site.name}
      phone={config.contact.phone}
      whatsapp={config.contact.whatsapp}
      regions={regions}
    />
  );
}
