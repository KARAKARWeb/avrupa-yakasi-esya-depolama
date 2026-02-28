import * as Icons from 'lucide-react';

interface SecurityInsuranceProps {
  title?: string;
  label?: string;
  subtitle?: string;
  features?: any[];
}

export default function SecurityInsurance({ title, label, subtitle, features }: SecurityInsuranceProps) {
  const defaultFeatures = [
    {
      icon: 'Shield',
      title: 'Sigortalı Eşya Depolama',
      subtitle: 'Tam Güvence Altında',
      details: ['Yangın sigortası kapsamı', 'Hırsızlık güvencesi', 'Su baskını koruması', 'Doğal afet sigortası', 'Tam değer tazminatı', 'Anında hasar ödemesi']
    },
    {
      icon: 'FileText',
      title: 'Sözleşmeli Eşya Depolama',
      subtitle: 'Yasal Güvence',
      details: ['Noter onaylı sözleşme', 'Detaylı envanter listesi', 'Eşya değer tespiti', 'Teslim alma protokolü', 'Aylık durum raporu', 'Esnek sözleşme süreleri']
    },
    {
      icon: 'Lock',
      title: 'Kilitli Oda Sistemleri',
      subtitle: 'Kişiye Özel',
      details: ['Bireysel kilitli odalar', 'Sadece size özel anahtar', 'Çelik kapı güvenliği', 'Numara plakalı odalar', 'Farklı metreküp seçenekleri', 'Gizlilik garantisi']
    },
    {
      icon: 'Camera',
      title: '7/24 Kamera Sistemleri & İzleme',
      subtitle: 'Kesintisiz Gözetim',
      details: ['HD kamera kayıt sistemi', '30 gün kayıt arşivi', 'Gece görüş teknolojisi', 'Canlı izleme merkezi', 'Tüm noktalarda kamera', 'Anlık alarm bildirimi']
    },
    {
      icon: 'Flame',
      title: 'Yangın ve Alarm Güvenlik Sistemleri',
      subtitle: 'Otomatik Koruma',
      details: ['Duman dedektörleri', 'Otomatik sprinkler sistemi', 'Yangın söndürme tüpleri', 'Acil çıkış yönlendirmeleri', 'İtfaiye bağlantısı', 'Düzenli yangın tatbikatı']
    },
    {
      icon: 'ClipboardCheck',
      title: 'Periyodik Depo Denetimi',
      subtitle: 'Düzenli Kontrol',
      details: ['Haftalık genel kontrol', 'Aylık detaylı denetim', 'Nem ve sıcaklık ölçümü', 'Haşere kontrol raporu', 'Temizlik ve hijyen kontrolü', 'Müşteri bilgilendirme']
    }
  ];

  const featuresList = (features && features.length > 0) ? features : defaultFeatures;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-4">
            <span className="text-primary font-semibold text-sm">{label || 'GÜVENLİK VE SİGORTA'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title || 'Eşyalarınız Tam Güvence Altında'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle || '7/24 kamera izleme, alarm sistemi, yangın güvenliği ve kapsamlı sigorta ile eşyalarınız maksimum koruma altındadır. Tüm güvenlik önlemleri sözleşmede detaylı olarak belirtilir.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feature: any, index: number) => {
            const Icon = (Icons as any)[feature.icon];
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm font-semibold text-primary">{feature.subtitle}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {feature.details?.map((detail: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
