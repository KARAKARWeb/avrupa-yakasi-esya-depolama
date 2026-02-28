'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface AboutUsSettings {
  intro: string;
  vision: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    content: string;
  };
  values: {
    title: string;
    items: string[];
  };
}

interface HakkimizdaAyarlariClientProps {
  initialSettings: AboutUsSettings;
}

export default function HakkimizdaAyarlariClient({ initialSettings }: HakkimizdaAyarlariClientProps) {
  const [settings, setSettings] = useState<AboutUsSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const updateSetting = (path: string[], value: any) => {
    setSettings((prev) => {
      const newSettings = { ...prev };
      let current: any = newSettings;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newSettings;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch('/api/admin/about-us-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Kaydetme başarısız');
      }

      toast.success('Hakkımızda ayarları başarıyla kaydedildi!', {
        duration: 3000,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      toast.error('Kaydetme sırasında bir hata oluştu!', {
        duration: 3000,
        position: 'top-right',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" toastOptions={{
        success: {
          style: {
            background: '#10b981',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
      }} />

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Hakkımızda Ayarları</h1>
            <p className="text-white/90 text-sm mt-1">Hakkımızda sayfası içeriklerini düzenleyin</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Giriş Metni */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Giriş Metni</h2>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={settings.intro}
                onChange={(e) => updateSetting(['intro'], e.target.value)}
                placeholder="Şirket tanıtım metni..."
              />
            </div>

            {/* Vizyon */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vizyon</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={settings.vision.title}
                    onChange={(e) => updateSetting(['vision', 'title'], e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={settings.vision.content}
                    onChange={(e) => updateSetting(['vision', 'content'], e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Misyon */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Misyon</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={settings.mission.title}
                    onChange={(e) => updateSetting(['mission', 'title'], e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={settings.mission.content}
                    onChange={(e) => updateSetting(['mission', 'content'], e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Değerler */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Değerlerimiz</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={settings.values.title}
                    onChange={(e) => updateSetting(['values', 'title'], e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Değerler (her satır bir madde)</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={settings.values.items.join('\n')}
                    onChange={(e) => updateSetting(['values', 'items'], e.target.value.split('\n').filter(line => line.trim()))}
                    placeholder="Güvenilirlik ve şeffaflık&#10;Müşteri memnuniyeti odaklılık&#10;Profesyonellik ve kalite"
                  />
                </div>
              </div>
            </div>

            {/* Kaydet Butonu */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
