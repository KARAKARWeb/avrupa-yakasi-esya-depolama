import * as Icons from 'lucide-react';

interface SecurityInfrastructureProps {
  title?: string;
  subtitle?: string;
  features?: any[];
}

export default function SecurityInfrastructure({ title, subtitle, features }: SecurityInfrastructureProps) {
  const defaultFeatures = [
    {
      icon: 'Thermometer',
      title: 'İklim Kontrolü',
      description: 'Klimalı depolarda nem ve sıcaklık kontrol altında tutulur. Hassas eşyalarınız için ideal ortam.'
    },
    {
      icon: 'Zap',
      title: 'Jeneratör Desteği',
      description: 'Elektrik kesintilerinde jeneratör ile kesintisiz hizmet. 7/24 enerji garantisi.'
    },
    {
      icon: 'Bug',
      title: 'Haşere Kontrolü',
      description: 'Düzenli ilaçlama ve haşere kontrolü. Hijyenik depolama ortamı garantisi.'
    },
    {
      icon: 'KeyRound',
      title: 'Erişim Kontrol Sistemi',
      description: 'Elektronik kart sistemi ile sadece yetkili giriş. Güvenli erişim kontrolü.'
    },
    {
      icon: 'ShieldCheck',
      title: '7/24 Güvenlik Personeli',
      description: 'Gece 2, gündüz 1 güvenlik görevlisi. Kesintisiz fiziksel güvenlik.'
    },
    {
      icon: 'Droplets',
      title: 'Düzenli Dezenfeksiyon',
      description: 'Haftalık profesyonel dezenfeksiyon uygulaması. Virüs ve bakteri koruması.'
    }
  ];

  const featuresList = (features && features.length > 0) ? features : defaultFeatures;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || 'Depolama Tesisi Altyapısı'}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle || 'Modern teknoloji ile donatılmış tesislerimizde eşyalarınız maksimum güvenlik altında'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature: any, index: number) => {
            const Icon = (Icons as any)[feature.icon];
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-gray-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-gray-600">Güvenlik Personeli</div>
              <div className="text-sm text-gray-500 mt-1">Gece 2 / Gündüz 1</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-gray-600">Jeneratör Kapasitesi</div>
              <div className="text-sm text-gray-500 mt-1">Kesintisiz Enerji</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Haftalık</div>
              <div className="text-gray-600">Dezenfeksiyon</div>
              <div className="text-sm text-gray-500 mt-1">Profesyonel Hijyen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
