'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface SeoAyarlariClientProps {
  initialSettings: any;
}

export default function SeoAyarlariClient({ initialSettings }: SeoAyarlariClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const updateSetting = (page: string, field: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/seo-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Kaydetme başarısız');

      toast.success('SEO ayarları başarıyla kaydedildi!');
      router.refresh();
    } catch (error) {
      toast.error('Kaydetme sırasında bir hata oluştu');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const pages = [
    { key: 'homepage', label: 'Ana Sayfa', url: 'http://localhost:3000' },
    { key: 'about', label: 'Hakkımızda', url: 'http://localhost:3000/hakkimizda' },
    { key: 'regions', label: 'Hizmet Bölgeleri', url: 'http://localhost:3000/hizmet-bolgeleri' },
    { key: 'contact', label: 'İletişim', url: 'http://localhost:3000/iletisim' },
  ];

  const countWords = (text: string) => {
    return text.split(',').filter(word => word.trim().length > 0).length;
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Ayarları</h1>
        <p className="text-gray-600 mt-1">Sayfa başlıkları, açıklamaları ve anahtar kelimeleri yönetin</p>
      </div>

      <div className="space-y-6">
        {pages.map((page) => {
          const pageSettings = settings[page.key] || {};
          const titleLength = (pageSettings.title || '').length;
          const descriptionLength = (pageSettings.description || '').length;
          const keywordsCount = countWords(pageSettings.keywords || '');

          return (
            <div key={page.key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{page.label}</h3>
                <a 
                  href={page.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {page.url}
                </a>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Title (Başlık)
                    </label>
                    <span className={`text-xs font-medium ${
                      titleLength > 60 ? 'text-red-500' : titleLength > 50 ? 'text-yellow-500' : 'text-gray-500'
                    }`}>
                      {titleLength} / 60 karakter
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={pageSettings.title || ''}
                    onChange={(e) => updateSetting(page.key, 'title', e.target.value)}
                    placeholder="Sayfa başlığı (max 60 karakter)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Google arama sonuçlarında görünecek başlık
                  </p>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description (Açıklama)
                    </label>
                    <span className={`text-xs font-medium ${
                      descriptionLength > 160 ? 'text-red-500' : descriptionLength > 150 ? 'text-yellow-500' : 'text-gray-500'
                    }`}>
                      {descriptionLength} / 160 karakter
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={pageSettings.description || ''}
                    onChange={(e) => updateSetting(page.key, 'description', e.target.value)}
                    placeholder="Sayfa açıklaması (max 160 karakter)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Google arama sonuçlarında görünecek açıklama
                  </p>
                </div>

                {/* Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Keywords (Anahtar Kelimeler)
                    </label>
                    <span className="text-xs font-medium text-gray-500">
                      {keywordsCount} kelime
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={pageSettings.keywords || ''}
                    onChange={(e) => updateSetting(page.key, 'keywords', e.target.value)}
                    placeholder="kelime1, kelime2, kelime3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Virgülle ayırarak yazınız (örn: eşya depolama, istanbul, güvenli)
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </div>
  );
}
