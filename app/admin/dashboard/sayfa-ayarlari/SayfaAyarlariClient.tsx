'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';
import { updateHomepageSettings } from '@/lib/actions/homepage-settings';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/RichTextEditor';
import toast, { Toaster } from 'react-hot-toast';

const sections = [
  { id: 'hero', name: 'Hero', description: 'Ana başlık ve fiyat hesaplama' },
  { id: 'seo1', name: 'Eşya Depolama Hakkında', description: 'SEO içerik 1' },
  { id: 'services', name: 'Hizmetlerimiz', description: 'Hizmet kartları' },
  { id: 'features', name: 'Neden Biz?', description: 'Özellikler ve avantajlar' },
  { id: 'how-it-works', name: 'Süreç Nasıl İşliyor?', description: '5 adımlı süreç' },
  { id: 'storage-sizes', name: 'Daire Tipine Göre Depolama Paketleri', description: 'Depo boyutları' },
  { id: 'security-infrastructure', name: 'Depolama Tesisi Altyapısı', description: 'Güvenlik özellikleri' },
  { id: 'security-insurance', name: 'Eşyalarınız Tam Güvence Altında', description: 'Güvenlik ve sigorta' },
  { id: 'gallery', name: 'Galeri', description: 'Depo fotoğrafları' },
  { id: 'insurance-packages', name: 'Ücretsiz Sigorta Paketleri', description: 'Sigorta seçenekleri' },
  { id: 'pricing', name: 'Fiyatlandırma', description: 'Depo ve nakliyat fiyatları' },
  { id: 'faq', name: 'Sıkça Sorulan Sorular', description: 'SSS' },
  { id: 'reviews', name: 'Müşteri Yorumları', description: 'Yorumlar' },
  { id: 'seo2', name: 'Güvenli Eşya Depolama Çözümleri', description: 'SEO içerik 2' },
  { id: 'cta', name: 'Hemen Teklif Alın!', description: 'Son çağrı butonu' },
];

interface SayfaAyarlariClientProps {
  initialSettings: any;
}

export default function SayfaAyarlariClient({ initialSettings }: SayfaAyarlariClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // localStorage'dan oku - sadece client'ta
    const saved = localStorage.getItem('expandedSection');
    setExpandedSection(saved || 'hero');
  }, []);
  const [sectionTitles, setSectionTitles] = useState<Record<string, string>>({
    'hero': initialSettings?.hero?.mainHeading || 'Hero',
    'seo1': initialSettings?.seo1?.title || 'Eşya Depolama Hakkında',
    'services': initialSettings?.services?.title || 'Hizmetlerimiz',
    'features': initialSettings?.features?.title || 'Neden Biz?',
    'how-it-works': initialSettings?.howItWorks?.title || 'Süreç Nasıl İşliyor?',
    'storage-sizes': initialSettings?.storageSizes?.title || 'Daire Tipine Göre Depolama Paketleri',
    'security-infrastructure': initialSettings?.securityInfrastructure?.title || 'Depolama Tesisi Altyapısı',
    'security-insurance': initialSettings?.securityInsurance?.title || 'Eşyalarınız Tam Güvence Altında',
    'gallery': initialSettings?.gallery?.title || 'Galeri',
    'insurance-packages': initialSettings?.insurancePackages?.title || 'Ücretsiz Sigorta Paketleri',
    'pricing': initialSettings?.pricing?.title || 'Fiyatlandırma',
    'faq': initialSettings?.faq?.title || 'Sıkça Sorulan Sorular',
    'reviews': initialSettings?.reviews?.title || 'Müşteri Yorumları',
    'seo2': initialSettings?.seo2?.title || 'Güvenli Eşya Depolama Çözümleri',
    'cta': initialSettings?.cta?.title || 'Hemen Teklif Alın!',
  });

  // initialSettings değiştiğinde settings'i güncelle
  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  // expandedSection değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (expandedSection) {
      localStorage.setItem('expandedSection', expandedSection);
    }
  }, [expandedSection]);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const loadingToast = toast.loading('Kaydediliyor...');
    
    try {
      const response = await fetch('/api/admin/homepage-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Kaydetme başarısız');
      }

      toast.success('Ayarlar başarıyla kaydedildi!', {
        id: loadingToast,
      });
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      toast.error('Kaydetme sırasında bir hata oluştu!', {
        id: loadingToast,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (path: string[], value: any) => {
    setSettings((prev: any) => {
      const newSettings = { ...prev };
      let current = newSettings;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newSettings;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Ana Sayfa Section'ları</h2>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                <Save size={18} />
                {isSaving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
              </button>
            </div>
          </div>
      
          <div className="divide-y divide-gray-200">
          {sections.map((section) => (
            <div key={section.id} className="p-4">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-semibold text-sm">
                    {sections.findIndex(s => s.id === section.id) + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{sectionTitles[section.id as keyof typeof sectionTitles]}</h3>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSection === section.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  
                  {/* HERO SECTION */}
                  {section.id === 'hero' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ana Başlık
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={settings?.hero?.mainHeading || ''}
                          onChange={(e) => {
                            updateSetting(['hero', 'mainHeading'], e.target.value);
                            setSectionTitles({...sectionTitles, 'hero': e.target.value});
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Açıklama
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={settings?.hero?.description || ''}
                          onChange={(e) => updateSetting(['hero', 'description'], e.target.value)}
                        />
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-4">Güven Rozetleri (12 Adet)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                          {settings?.hero?.trustBadges?.map((badge: any, index: number) => (
                            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold">
                                  {index + 1}
                                </span>
                                <span className="text-xs text-gray-500">Icon: {badge.icon}</span>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Başlık
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={badge.text || ''}
                                    onChange={(e) => {
                                      const newBadges = [...(settings?.hero?.trustBadges || [])];
                                      newBadges[index] = { ...newBadges[index], text: e.target.value };
                                      updateSetting(['hero', 'trustBadges'], newBadges);
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Açıklama (Tooltip)
                                  </label>
                                  <textarea
                                    rows={3}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={badge.description || ''}
                                    onChange={(e) => {
                                      const newBadges = [...(settings?.hero?.trustBadges || [])];
                                      newBadges[index] = { ...newBadges[index], description: e.target.value };
                                      updateSetting(['hero', 'trustBadges'], newBadges);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SEO1 SECTION */}
                  {section.id === 'seo1' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ana Başlık
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={settings?.seo1?.title || ''}
                          onChange={(e) => {
                            updateSetting(['seo1', 'title'], e.target.value);
                            setSectionTitles({...sectionTitles, 'seo1': e.target.value});
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          İçerik
                        </label>
                        <RichTextEditor
                          value={settings?.seo1?.content || ''}
                          onChange={(value) => updateSetting(['seo1', 'content'], value)}
                          placeholder="İçerik yazın..."
                        />
                      </div>
                    </div>
                  )}

                  {/* SEO2 SECTION */}
                  {section.id === 'seo2' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ana Başlık
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={settings?.seo2?.title || ''}
                          onChange={(e) => {
                            updateSetting(['seo2', 'title'], e.target.value);
                            setSectionTitles({...sectionTitles, 'seo2': e.target.value});
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          İçerik
                        </label>
                        <RichTextEditor
                          value={settings?.seo2?.content || ''}
                          onChange={(value) => updateSetting(['seo2', 'content'], value)}
                          placeholder="İçerik yazın..."
                        />
                      </div>
                    </div>
                  )}

                  {/* SERVICES SECTION */}
                  {section.id === 'services' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.services?.title || ''} onChange={(e) => updateSetting(['services', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.services?.subtitle || ''} onChange={(e) => updateSetting(['services', 'subtitle'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama (Kartların Altında)</label>
                        <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.services?.description || ''} onChange={(e) => updateSetting(['services', 'description'], e.target.value)} placeholder="Profesyonel eşya depolama hizmetlerimizle..." />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Hizmet Kartları</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {settings?.services?.services?.map((service: any, index: number) => (
                            <div key={service.id} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={service.title} onChange={(e) => {
                                  const newServices = [...(settings?.services?.services || [])];
                                  newServices[index] = {...newServices[index], title: e.target.value};
                                  updateSetting(['services', 'services'], newServices);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                                <textarea rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={service.description} onChange={(e) => {
                                  const newServices = [...(settings?.services?.services || [])];
                                  newServices[index] = {...newServices[index], description: e.target.value};
                                  updateSetting(['services', 'services'], newServices);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={service.icon} onChange={(e) => {
                                  const newServices = [...(settings?.services?.services || [])];
                                  newServices[index] = {...newServices[index], icon: e.target.value};
                                  updateSetting(['services', 'services'], newServices);
                                }} placeholder="Warehouse" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FEATURES SECTION */}
                  {section.id === 'features' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.features?.title || ''} onChange={(e) => updateSetting(['features', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.features?.subtitle || ''} onChange={(e) => updateSetting(['features', 'subtitle'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama (Kartların Altında)</label>
                        <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.features?.description || ''} onChange={(e) => updateSetting(['features', 'description'], e.target.value)} placeholder="Müşteri memnuniyeti odaklı hizmet anlayışımızla..." />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Özellik Kartları</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {settings?.features?.features?.map((feature: any, index: number) => (
                            <div key={feature.id} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.title} onChange={(e) => {
                                  const newFeatures = [...(settings?.features?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], title: e.target.value};
                                  updateSetting(['features', 'features'], newFeatures);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                                <textarea rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.description} onChange={(e) => {
                                  const newFeatures = [...(settings?.features?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], description: e.target.value};
                                  updateSetting(['features', 'features'], newFeatures);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.icon} onChange={(e) => {
                                  const newFeatures = [...(settings?.features?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], icon: e.target.value};
                                  updateSetting(['features', 'features'], newFeatures);
                                }} placeholder="Package" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* HOW IT WORKS SECTION */}
                  {section.id === 'how-it-works' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.howItWorks?.title || ''} onChange={(e) => updateSetting(['howItWorks', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.howItWorks?.subtitle || ''} onChange={(e) => updateSetting(['howItWorks', 'subtitle'], e.target.value)} />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Adımlar</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {settings?.howItWorks?.steps?.map((step: any, index: number) => (
                            <div key={step.number} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={step.title} onChange={(e) => {
                                  const newSteps = [...(settings?.howItWorks?.steps || [])];
                                  newSteps[index] = {...newSteps[index], title: e.target.value};
                                  updateSetting(['howItWorks', 'steps'], newSteps);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                                <textarea rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={step.description} onChange={(e) => {
                                  const newSteps = [...(settings?.howItWorks?.steps || [])];
                                  newSteps[index] = {...newSteps[index], description: e.target.value};
                                  updateSetting(['howItWorks', 'steps'], newSteps);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={step.icon} onChange={(e) => {
                                  const newSteps = [...(settings?.howItWorks?.steps || [])];
                                  newSteps[index] = {...newSteps[index], icon: e.target.value};
                                  updateSetting(['howItWorks', 'steps'], newSteps);
                                }} placeholder="Phone" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STORAGE SIZES SECTION */}
                  {section.id === 'storage-sizes' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.storageSizes?.title || ''} onChange={(e) => updateSetting(['storageSizes', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.storageSizes?.subtitle || ''} onChange={(e) => updateSetting(['storageSizes', 'subtitle'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                        <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.storageSizes?.description || ''} onChange={(e) => updateSetting(['storageSizes', 'description'], e.target.value)} />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Paketler</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {settings?.storageSizes?.packages?.map((pkg: any, index: number) => (
                            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" placeholder="Home" value={pkg.icon || ''} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], icon: e.target.value};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={pkg.title} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], title: e.target.value};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Boyut</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={pkg.size} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], size: e.target.value};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                                <textarea rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={pkg.description} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], description: e.target.value};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Örnekler (her satır bir madde)</label>
                                <textarea rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" placeholder="Masa sandalye&#10;Mutfak eşyaları&#10;Kişisel eşyalar" value={pkg.examples?.join('\n') || ''} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], examples: e.target.value.split('\n').filter((line: string) => line.trim())};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Özel Vurgu</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" placeholder="Özel Paketleme Dahil" value={pkg.highlight || ''} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], highlight: e.target.value};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Renk (Tailwind class)</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" placeholder="bg-blue-500/10" value={pkg.color || ''} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], color: e.target.value};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Fiyat</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={pkg.price} onChange={(e) => {
                                  const newPackages = [...(settings?.storageSizes?.packages || [])];
                                  newPackages[index] = {...newPackages[index], price: e.target.value};
                                  updateSetting(['storageSizes', 'packages'], newPackages);
                                }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECURITY INFRASTRUCTURE SECTION */}
                  {section.id === 'security-infrastructure' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.securityInfrastructure?.title || ''} onChange={(e) => updateSetting(['securityInfrastructure', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.securityInfrastructure?.subtitle || ''} onChange={(e) => updateSetting(['securityInfrastructure', 'subtitle'], e.target.value)} />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Güvenlik Özellikleri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {settings?.securityInfrastructure?.features?.map((feature: any, index: number) => (
                            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.title} onChange={(e) => {
                                  const newFeatures = [...(settings?.securityInfrastructure?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], title: e.target.value};
                                  updateSetting(['securityInfrastructure', 'features'], newFeatures);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                                <textarea rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.description} onChange={(e) => {
                                  const newFeatures = [...(settings?.securityInfrastructure?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], description: e.target.value};
                                  updateSetting(['securityInfrastructure', 'features'], newFeatures);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.icon} onChange={(e) => {
                                  const newFeatures = [...(settings?.securityInfrastructure?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], icon: e.target.value};
                                  updateSetting(['securityInfrastructure', 'features'], newFeatures);
                                }} placeholder="Thermometer" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECURITY INSURANCE SECTION */}
                  {section.id === 'security-insurance' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.securityInsurance?.title || ''} onChange={(e) => updateSetting(['securityInsurance', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Etiket</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.securityInsurance?.label || ''} onChange={(e) => updateSetting(['securityInsurance', 'label'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.securityInsurance?.subtitle || ''} onChange={(e) => updateSetting(['securityInsurance', 'subtitle'], e.target.value)} />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Güvenlik Kartları</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {settings?.securityInsurance?.features?.map((feature: any, index: number) => (
                            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.title} onChange={(e) => {
                                  const newFeatures = [...(settings?.securityInsurance?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], title: e.target.value};
                                  updateSetting(['securityInsurance', 'features'], newFeatures);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Alt Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.subtitle} onChange={(e) => {
                                  const newFeatures = [...(settings?.securityInsurance?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], subtitle: e.target.value};
                                  updateSetting(['securityInsurance', 'features'], newFeatures);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={feature.icon} onChange={(e) => {
                                  const newFeatures = [...(settings?.securityInsurance?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], icon: e.target.value};
                                  updateSetting(['securityInsurance', 'features'], newFeatures);
                                }} placeholder="Shield" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Detaylar (her satır bir madde)</label>
                                <textarea rows={4} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" placeholder="Yangın sigortası kapsamı&#10;Hırsızlık güvencesi&#10;Su baskını koruması" value={feature.details?.join('\n') || ''} onChange={(e) => {
                                  const newFeatures = [...(settings?.securityInsurance?.features || [])];
                                  newFeatures[index] = {...newFeatures[index], details: e.target.value.split('\n').filter((line: string) => line.trim())};
                                  updateSetting(['securityInsurance', 'features'], newFeatures);
                                }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GALLERY SECTION */}
                  {section.id === 'gallery' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.gallery?.title || ''} onChange={(e) => updateSetting(['gallery', 'title'], e.target.value)} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.gallery?.subtitle || ''} onChange={(e) => updateSetting(['gallery', 'subtitle'], e.target.value)} placeholder="Modern ve güvenli depolarımızdan görüntüler" />
                      </div>

                      <div className="border-t pt-4 mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Galeri Resimleri</h4>
                          <label className="px-4 py-2 bg-primary text-white text-sm rounded hover:bg-primary/90 cursor-pointer">
                            + Resim Yükle
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const files = Array.from(e.target.files || []);
                                if (files.length === 0) return;

                                const formData = new FormData();
                                files.forEach((file) => {
                                  formData.append('images', file);
                                });

                                try {
                                  const response = await fetch('/api/upload-gallery', {
                                    method: 'POST',
                                    body: formData,
                                  });

                                  if (!response.ok) throw new Error('Upload failed');

                                  const result = await response.json();
                                  const currentImages = settings?.gallery?.images || [];
                                  const newImages = result.images.map((url: string, index: number) => ({
                                    id: `gallery-${Date.now()}-${index}`,
                                    src: url,
                                    alt: `Galeri ${currentImages.length + index + 1}`,
                                    title: `Depo Görüntüsü ${currentImages.length + index + 1}`
                                  }));
                                  
                                  updateSetting(['gallery', 'images'], [...currentImages, ...newImages]);
                                  toast.success(`${files.length} resim yüklendi!`);
                                } catch (error) {
                                  toast.error('Resim yükleme başarısız');
                                  console.error(error);
                                }
                              }}
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {settings?.gallery?.images?.map((image: any, index: number) => (
                            <div key={image.id} className="relative group">
                              <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() => {
                                    const newImages = settings?.gallery?.images?.filter((_: any, i: number) => i !== index);
                                    updateSetting(['gallery', 'images'], newImages);
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Sil"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                              <div className="mt-2 space-y-1">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                                  value={image.title || ''}
                                  onChange={(e) => {
                                    const newImages = [...(settings?.gallery?.images || [])];
                                    newImages[index] = {...newImages[index], title: e.target.value};
                                    updateSetting(['gallery', 'images'], newImages);
                                  }}
                                  placeholder="Başlık"
                                />
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                                  value={image.alt || ''}
                                  onChange={(e) => {
                                    const newImages = [...(settings?.gallery?.images || [])];
                                    newImages[index] = {...newImages[index], alt: e.target.value};
                                    updateSetting(['gallery', 'images'], newImages);
                                  }}
                                  placeholder="Alt text"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {(!settings?.gallery?.images || settings?.gallery?.images?.length === 0) && (
                          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Henüz resim yüklenmedi</p>
                            <p className="text-xs text-gray-500">Toplu resim yüklemek için yukarıdaki butonu kullanın</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* INSURANCE PACKAGES SECTION */}
                  {section.id === 'insurance-packages' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.insurancePackages?.title || ''} onChange={(e) => updateSetting(['insurancePackages', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.insurancePackages?.subtitle || ''} onChange={(e) => updateSetting(['insurancePackages', 'subtitle'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bilgi Başlığı</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.insurancePackages?.infoTitle || ''} onChange={(e) => updateSetting(['insurancePackages', 'infoTitle'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bilgi Metni 1</label>
                        <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.insurancePackages?.infoText1 || ''} onChange={(e) => updateSetting(['insurancePackages', 'infoText1'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bilgi Metni 2</label>
                        <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.insurancePackages?.infoText2 || ''} onChange={(e) => updateSetting(['insurancePackages', 'infoText2'], e.target.value)} />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Sigorta Paketleri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {settings?.insurancePackages?.packages?.map((pkg: any, index: number) => (
                            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Başlık</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={pkg.title} onChange={(e) => {
                                  const newPackages = [...(settings?.insurancePackages?.packages || [])];
                                  newPackages[index] = {...newPackages[index], title: e.target.value};
                                  updateSetting(['insurancePackages', 'packages'], newPackages);
                                }} />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Teminat</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={pkg.coverage} onChange={(e) => {
                                  const newPackages = [...(settings?.insurancePackages?.packages || [])];
                                  newPackages[index] = {...newPackages[index], coverage: e.target.value};
                                  updateSetting(['insurancePackages', 'packages'], newPackages);
                                }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Sigorta paketleri ve özellikler ayrı bir sayfadan yönetilir.</p>
                    </div>
                  )}

                  {/* PRICING SECTION */}
                  {section.id === 'pricing' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Etiket (Küçük Başlık)</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.pricing?.label || ''} onChange={(e) => updateSetting(['pricing', 'label'], e.target.value)} placeholder="FİYATLANDIRMA" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ana Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.pricing?.heading || ''} onChange={(e) => updateSetting(['pricing', 'heading'], e.target.value)} placeholder="Şeffaf ve Uygun Fiyatlar" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.pricing?.description || ''} onChange={(e) => updateSetting(['pricing', 'description'], e.target.value)} placeholder="Daire tipinize göre özel fiyatlandırma ve profesyonel taşıma hizmetleri" />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Depolama Fiyatları (Daire Tipine Göre)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {settings?.pricing?.storagePrices?.map((price: any, index: number) => (
                            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Daire Tipi</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.type || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.storagePrices || [])];
                                  newPrices[index] = {...newPrices[index], type: e.target.value};
                                  updateSetting(['pricing', 'storagePrices'], newPrices);
                                }} placeholder="1+0 Daire" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Metreküp</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.volume || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.storagePrices || [])];
                                  newPrices[index] = {...newPrices[index], volume: e.target.value};
                                  updateSetting(['pricing', 'storagePrices'], newPrices);
                                }} placeholder="8 m³" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Aylık Ücret</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.price || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.storagePrices || [])];
                                  newPrices[index] = {...newPrices[index], price: e.target.value};
                                  updateSetting(['pricing', 'storagePrices'], newPrices);
                                }} placeholder="2.700 ₺" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Stok Durumu</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.stock || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.storagePrices || [])];
                                  newPrices[index] = {...newPrices[index], stock: e.target.value};
                                  updateSetting(['pricing', 'storagePrices'], newPrices);
                                }} placeholder="8 Boş" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Özellikler (her satır bir madde)</label>
                                <textarea rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.features?.join('\n') || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.storagePrices || [])];
                                  newPrices[index] = {...newPrices[index], features: e.target.value.split('\n').filter((line: string) => line.trim())};
                                  updateSetting(['pricing', 'storagePrices'], newPrices);
                                }} placeholder="Küçük daireler için&#10;Temel eşyalar&#10;Kısa süreli" />
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id={`popular-storage-${index}`} checked={price.popular || false} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.storagePrices || [])];
                                  newPrices[index] = {...newPrices[index], popular: e.target.checked};
                                  updateSetting(['pricing', 'storagePrices'], newPrices);
                                }} className="rounded" />
                                <label htmlFor={`popular-storage-${index}`} className="text-xs font-medium text-gray-600">Popüler olarak işaretle</label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Taşıma Fiyatları (Evden Depoya)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {settings?.pricing?.movingPrices?.map((price: any, index: number) => (
                            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Daire Tipi</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.type || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.movingPrices || [])];
                                  newPrices[index] = {...newPrices[index], type: e.target.value};
                                  updateSetting(['pricing', 'movingPrices'], newPrices);
                                }} placeholder="1+0 Ev Taşıma" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Taşıma Ücreti</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.price || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.movingPrices || [])];
                                  newPrices[index] = {...newPrices[index], price: e.target.value};
                                  updateSetting(['pricing', 'movingPrices'], newPrices);
                                }} placeholder="10.000 ₺" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Hizmet Kapsamı (her satır bir madde)</label>
                                <textarea rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={price.features?.join('\n') || ''} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.movingPrices || [])];
                                  newPrices[index] = {...newPrices[index], features: e.target.value.split('\n').filter((line: string) => line.trim())};
                                  updateSetting(['pricing', 'movingPrices'], newPrices);
                                }} placeholder="Profesyonel ekip&#10;Paketleme malzemesi&#10;Sigortalı taşıma" />
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id={`popular-moving-${index}`} checked={price.popular || false} onChange={(e) => {
                                  const newPrices = [...(settings?.pricing?.movingPrices || [])];
                                  newPrices[index] = {...newPrices[index], popular: e.target.checked};
                                  updateSetting(['pricing', 'movingPrices'], newPrices);
                                }} className="rounded" />
                                <label htmlFor={`popular-moving-${index}`} className="text-xs font-medium text-gray-600">Popüler olarak işaretle</label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FAQ SECTION */}
                  {section.id === 'faq' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.faq?.title || ''} onChange={(e) => updateSetting(['faq', 'title'], e.target.value)} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.faq?.subtitle || ''} onChange={(e) => updateSetting(['faq', 'subtitle'], e.target.value)} placeholder="Eşya depolama hakkında merak ettikleriniz" />
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Sorular</h4>
                          <button
                            onClick={() => {
                              const newQuestions = [...(settings?.faq?.questions || []), {
                                id: `faq-${Date.now()}`,
                                question: '',
                                answer: ''
                              }];
                              updateSetting(['faq', 'questions'], newQuestions);
                            }}
                            className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary/90"
                          >
                            + Soru Ekle
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {settings?.faq?.questions?.map((faq: any, index: number) => (
                            <div key={faq.id} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Soru</label>
                                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={faq.question} onChange={(e) => {
                                  const newQuestions = [...(settings?.faq?.questions || [])];
                                  newQuestions[index] = {...newQuestions[index], question: e.target.value};
                                  updateSetting(['faq', 'questions'], newQuestions);
                                }} placeholder="Soru yazın..." />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Cevap</label>
                                <textarea rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded" value={faq.answer} onChange={(e) => {
                                  const newQuestions = [...(settings?.faq?.questions || [])];
                                  newQuestions[index] = {...newQuestions[index], answer: e.target.value};
                                  updateSetting(['faq', 'questions'], newQuestions);
                                }} placeholder="Cevap yazın..." />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  onClick={() => {
                                    const newQuestions = settings?.faq?.questions?.filter((_: any, i: number) => i !== index);
                                    updateSetting(['faq', 'questions'], newQuestions);
                                  }}
                                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                                >
                                  Sil
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* REVIEWS SECTION */}
                  {section.id === 'reviews' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.reviews?.title || ''} onChange={(e) => updateSetting(['reviews', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.reviews?.subtitle || ''} onChange={(e) => updateSetting(['reviews', 'subtitle'], e.target.value)} />
                      </div>
                      <p className="text-sm text-gray-500 mt-4">Yorumlar <a href="/admin/yorumlar" className="text-primary hover:underline font-medium">Yorumlar Yönetimi</a> sayfasından yönetilir.</p>
                    </div>
                  )}

                  {/* CTA SECTION */}
                  {section.id === 'cta' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.cta?.title || ''} onChange={(e) => updateSetting(['cta', 'title'], e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                        <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={settings?.cta?.description || ''} onChange={(e) => updateSetting(['cta', 'description'], e.target.value)} />
                      </div>
                      <p className="text-sm text-gray-500">Telefon ve WhatsApp bilgileri Site Ayarları'ndan yönetilir.</p>
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
