import { getHomepageSettings } from '@/lib/actions/homepage-settings';
import SayfaAyarlariClient from './SayfaAyarlariClient';

export default async function SayfaAyarlariPage() {
  const settings = await getHomepageSettings();
  
  return <SayfaAyarlariClient initialSettings={settings} />;
}
