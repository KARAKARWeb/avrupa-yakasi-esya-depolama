import { Users, Building2, MapPin, Star } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: '5000+',
      label: 'Mutlu Müşteri',
      description: 'Güvenle hizmet veriyoruz'
    },
    {
      icon: Building2,
      value: '10000+',
      label: 'Metrekare Depo',
      description: 'Geniş alan kapasitesi'
    },
    {
      icon: MapPin,
      value: '15+',
      label: 'Hizmet Bölgesi',
      description: 'İstanbul genelinde'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Müşteri Memnuniyeti',
      description: 'Yüksek kalite standartları'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-2xl">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
