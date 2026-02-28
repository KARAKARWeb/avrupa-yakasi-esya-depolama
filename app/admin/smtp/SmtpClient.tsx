'use client';

import { useState } from 'react';
import { Save, Mail, Lock, Server } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface SmtpClientProps {
  initialSettings: any;
}

export default function SmtpClient({ initialSettings }: SmtpClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const updateSetting = (field: string, value: string | boolean) => {
    setSettings((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/smtp-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Kaydetme başarısız');

      toast.success('SMTP ayarları başarıyla kaydedildi!');
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
        <h1 className="text-3xl font-bold text-gray-900">SMTP Ayarları</h1>
        <p className="text-gray-600 mt-1">E-posta gönderim ayarlarını yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          
          {/* Server Settings */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Sunucu Ayarları</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Host (Sunucu)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings.host || ''}
                  onChange={(e) => updateSetting('host', e.target.value)}
                  placeholder="smtp.yandex.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Örnek: smtp.gmail.com, smtp.yandex.com
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Port
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings.port || ''}
                  onChange={(e) => updateSetting('port', e.target.value)}
                  placeholder="587"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Genellikle 587 (TLS) veya 465 (SSL)
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={settings.secure || false}
                  onChange={(e) => updateSetting('secure', e.target.checked)}
                />
                <span className="text-sm font-medium text-gray-700">
                  SSL/TLS Kullan (Port 465 için)
                </span>
              </label>
            </div>
          </div>

          {/* Authentication */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Kimlik Doğrulama</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kullanıcı Adı (E-posta)
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings.user || ''}
                  onChange={(e) => updateSetting('user', e.target.value)}
                  placeholder="info@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre / Uygulama Şifresi
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings.pass || ''}
                  onChange={(e) => updateSetting('pass', e.target.value)}
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gmail için uygulama şifresi oluşturmanız gerekebilir
                </p>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">E-posta Ayarları</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gönderen E-posta (From)
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings.from || ''}
                  onChange={(e) => updateSetting('from', e.target.value)}
                  placeholder="info@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Müşterilere gönderilen maillerde görünecek adres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alıcı E-posta (To)
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={settings.to || ''}
                  onChange={(e) => updateSetting('to', e.target.value)}
                  placeholder="admin@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Form gönderimlerinin ulaşacağı e-posta adresi
                </p>
              </div>
            </div>
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

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">📌 Önemli Notlar:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Gmail kullanıyorsanız, "Uygulama Şifresi" oluşturmanız gerekir</li>
          <li>Yandex Mail için standart şifrenizi kullanabilirsiniz</li>
          <li>Port 587 için SSL/TLS seçeneğini kapalı bırakın</li>
          <li>Port 465 için SSL/TLS seçeneğini açın</li>
          <li>Ayarları kaydettikten sonra test maili göndererek kontrol edin</li>
        </ul>
      </div>
    </div>
  );
}
