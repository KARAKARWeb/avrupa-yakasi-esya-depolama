'use client';

import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface FiyatlarClientProps {
  initialSettings: any;
}

export default function FiyatlarClient({ initialSettings }: FiyatlarClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const updateSetting = (path: string[], value: any) => {
    setSettings((prev: any) => {
      const newSettings = { ...prev };
      let current = newSettings;
      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newSettings;
    });
  };

  const addApartmentType = () => {
    const newTypes = [...(settings.apartmentTypes || []), {
      value: '',
      label: '',
      volume: 0
    }];
    updateSetting(['apartmentTypes'], newTypes);
  };

  const removeApartmentType = (index: number) => {
    const newTypes = settings.apartmentTypes.filter((_: any, i: number) => i !== index);
    updateSetting(['apartmentTypes'], newTypes);
  };

  const addDuration = () => {
    const newDurations = [...(settings.durationOptions || []), {
      value: 1,
      label: ''
    }];
    updateSetting(['durationOptions'], newDurations);
  };

  const removeDuration = (index: number) => {
    const newDurations = settings.durationOptions.filter((_: any, i: number) => i !== index);
    updateSetting(['durationOptions'], newDurations);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/price-calculator-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Kaydetme başarısız');

      toast.success('Form ayarları başarıyla kaydedildi!');
      router.refresh();
    } catch (error) {
      toast.error('Kaydetme sırasında bir hata oluştu');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fiyat Hesaplama Formu Ayarları</h1>
        <p className="text-gray-600 mt-1">Ana sayfadaki fiyat hesaplama formunun tüm ayarlarını buradan yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Başlıklar ve Metinler */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlıklar ve Metinler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Başlığı</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.title || ''}
                onChange={(e) => updateSetting(['title'], e.target.value)}
                placeholder="Ücretsiz Fiyat Teklifi Alın"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat Etiketi</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.priceLabel || ''}
                onChange={(e) => updateSetting(['priceLabel'], e.target.value)}
                placeholder="Tahmini Toplam Fiyat"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad Placeholder</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.namePlaceholder || ''}
                onChange={(e) => updateSetting(['namePlaceholder'], e.target.value)}
                placeholder="Ad Soyad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Placeholder</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.phonePlaceholder || ''}
                onChange={(e) => updateSetting(['phonePlaceholder'], e.target.value)}
                placeholder="Telefon: 5XX XXX XX XX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daire Tipi Etiketi</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.apartmentLabel || ''}
                onChange={(e) => updateSetting(['apartmentLabel'], e.target.value)}
                placeholder="Daire Tipi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Süre Etiketi</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.durationLabel || ''}
                onChange={(e) => updateSetting(['durationLabel'], e.target.value)}
                placeholder="Depolama Süresi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ek Hizmetler Etiketi</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.servicesLabel || ''}
                onChange={(e) => updateSetting(['servicesLabel'], e.target.value)}
                placeholder="Ek Hizmetler (Opsiyonel)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gönder Butonu</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.submitButton || ''}
                onChange={(e) => updateSetting(['submitButton'], e.target.value)}
                placeholder="Hemen Teklif Al"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gönder Butonu (Devre Dışı)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.submitButtonDisabled || ''}
                onChange={(e) => updateSetting(['submitButtonDisabled'], e.target.value)}
                placeholder="Bilgilerinizi Girin"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bilgi Metni</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={settings.infoText || ''}
                onChange={(e) => updateSetting(['infoText'], e.target.value)}
                placeholder="Fiyat görmek için ad soyad ve telefon bilgilerinizi giriniz"
              />
            </div>
          </div>
        </div>

        {/* Daire Tipleri ve Fiyatları */}
        <div className="border-b pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daire Tipleri ve Aylık Fiyatları</h3>
            <button
              onClick={addApartmentType}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Daire Tipi Ekle
            </button>
          </div>
          <div className="space-y-3">
            {settings.apartmentTypes?.map((apt: any, index: number) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-end p-3 bg-gray-50 rounded-lg">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Değer (value)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    value={apt.value || ''}
                    onChange={(e) => {
                      const newTypes = [...settings.apartmentTypes];
                      newTypes[index] = { ...newTypes[index], value: e.target.value };
                      updateSetting(['apartmentTypes'], newTypes);
                    }}
                    placeholder="1+0"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Etiket</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    value={apt.label || ''}
                    onChange={(e) => {
                      const newTypes = [...settings.apartmentTypes];
                      newTypes[index] = { ...newTypes[index], label: e.target.value };
                      updateSetting(['apartmentTypes'], newTypes);
                    }}
                    placeholder="1+0 Daire"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Hacim (m³)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    value={apt.volume || 0}
                    onChange={(e) => {
                      const newTypes = [...settings.apartmentTypes];
                      newTypes[index] = { ...newTypes[index], volume: Number(e.target.value) };
                      updateSetting(['apartmentTypes'], newTypes);
                    }}
                    placeholder="3"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Aylık Fiyat (₺)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    value={apt.monthlyPrice || 0}
                    onChange={(e) => {
                      const newTypes = [...settings.apartmentTypes];
                      newTypes[index] = { ...newTypes[index], monthlyPrice: Number(e.target.value) };
                      updateSetting(['apartmentTypes'], newTypes);
                    }}
                    placeholder="800"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => removeApartmentType(index)}
                    className="w-full px-3 py-2 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Süre Seçenekleri */}
        <div className="border-b pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Depolama Süreleri</h3>
            <button
              onClick={addDuration}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Süre Ekle
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {settings.durationOptions?.map((dur: any, index: number) => (
              <div key={index} className="flex gap-3 items-end p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Değer (Ay)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    value={dur.value || 1}
                    onChange={(e) => {
                      const newDurations = [...settings.durationOptions];
                      newDurations[index] = { ...newDurations[index], value: Number(e.target.value) };
                      updateSetting(['durationOptions'], newDurations);
                    }}
                    placeholder="1"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Etiket</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    value={dur.label || ''}
                    onChange={(e) => {
                      const newDurations = [...settings.durationOptions];
                      newDurations[index] = { ...newDurations[index], label: e.target.value };
                      updateSetting(['durationOptions'], newDurations);
                    }}
                    placeholder="1 Ay"
                  />
                </div>
                <button
                  onClick={() => removeDuration(index)}
                  className="px-3 py-2 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
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
