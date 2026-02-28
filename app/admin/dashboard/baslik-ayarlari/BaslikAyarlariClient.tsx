'use client';

import { useState } from 'react';
import { Save, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface BaslikAyarlariClientProps {
  initialSettings: any;
}

export default function BaslikAyarlariClient({ initialSettings }: BaslikAyarlariClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const updateSetting = (key: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/homepage-settings/page-headers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Kaydetme başarısız');

      toast.success('Başlık ayarları başarıyla kaydedildi!');
      router.refresh();
    } catch (error) {
      toast.error('Kaydetme sırasında bir hata oluştu');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
            <div className="flex items-center gap-3 text-white">
              <Info className="w-6 h-6" />
              <div>
                <h1 className="text-2xl font-bold">Başlık Ayarları</h1>
                <p className="text-sm text-white/80 mt-1">Sayfa başlıklarının açıklamalarını düzenleyin</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* İletişim Sayfası */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim Sayfası</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings?.iletisim || ''}
                  onChange={(e) => updateSetting('iletisim', e.target.value)}
                  placeholder="7/24 müşteri hizmetleri ile size yardımcı olmaya hazırız"
                />
              </div>
            </div>

            {/* Hizmet Bölgeleri Sayfası */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hizmet Bölgeleri Sayfası</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings?.hizmetBolgeleri || ''}
                  onChange={(e) => updateSetting('hizmetBolgeleri', e.target.value)}
                  placeholder="İstanbul'un tüm ilçelerinde profesyonel eşya depolama hizmeti"
                />
              </div>
            </div>

            {/* Hakkımızda Sayfası */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hakkımızda Sayfası</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings?.hakkimizda || ''}
                  onChange={(e) => updateSetting('hakkimizda', e.target.value)}
                  placeholder="Eşya depolama sektöründe güvenilir ve profesyonel hizmet"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
