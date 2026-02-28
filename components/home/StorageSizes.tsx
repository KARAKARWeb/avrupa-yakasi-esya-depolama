import * as Icons from 'lucide-react';

interface StorageSizesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  packages?: any[];
}

export default function StorageSizes({ title, subtitle, description, packages }: StorageSizesProps) {
  const defaultPackages = [
    {
      icon: 'Home',
      size: '8 m³',
      title: '1+0 Daire',
      description: 'Tek kişilik yaşam alanı için ideal.',
      examples: [
        'Tek kişilik yatak',
        'Küçük dolap',
        'Masa sandalye',
        'Mutfak eşyaları',
        'Kişisel eşyalar',
        'Mevsimlik kıyafetler'
      ],
      highlight: 'Özel Paketleme Dahil',
      color: 'bg-blue-500/10',
      price: '2.700₺/ay'
    },
    {
      icon: 'Building',
      size: '17 m³',
      title: '1+1 Daire',
      description: 'Çift veya küçük aileler için.',
      examples: [
        'Çift kişilik yatak',
        '2-3 kişilik koltuk',
        'Buzdolabı',
        'Çamaşır makinesi',
        'TV ünitesi',
        'Yemek masası',
        'Gardırop'
      ],
      highlight: 'Özel Paketleme Dahil',
      color: 'bg-blue-500/10',
      price: '4.000₺/ay'
    },
    {
      icon: 'Building2',
      size: '24 m³',
      title: '2+1 Daire',
      description: 'Orta boy aileler için komple paket.',
      examples: [
        '2 yatak odası',
        'Salon takımı',
        '4-6 kişilik masa',
        'Beyaz eşyalar',
        'TV ünitesi',
        'Çocuk odası',
        'Mutfak dolabı'
      ],
      highlight: 'Özel Paketleme Dahil',
      color: 'bg-blue-600/15',
      price: '6.500₺/ay'
    },
    {
      icon: 'Warehouse',
      size: '30 m³',
      title: '3+1 Daire',
      description: 'Geniş aileler için kapsamlı çözüm.',
      examples: [
        '3 yatak odası',
        'Geniş salon takımı',
        '6-8 kişilik masa',
        'Çalışma odası',
        'Beyaz eşyalar',
        'TV ünitesi',
        'Dekorasyon ürünleri'
      ],
      highlight: 'Özel Paketleme Dahil',
      color: 'bg-blue-500/10',
      price: '7.500₺/ay'
    },
    {
      icon: 'Hotel',
      size: '40 m³',
      title: '4+1 Daire',
      description: 'Lüks daire ve villa için.',
      examples: [
        '4 yatak odası',
        'Lüks salon takımı',
        '8+ kişilik masa',
        'Çalışma odası',
        'Beyaz eşyalar',
        'Bahçe mobilyaları',
        'Spor ekipmanları',
        'Ekstra depolama'
      ],
      highlight: 'Özel Paketleme Dahil',
      color: 'bg-blue-500/10',
      price: '11.000₺/ay'
    }
  ];

  const sizes = (packages && packages.length > 0) ? packages : defaultPackages;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || 'Daire Tipine Göre Depolama Paketleri'}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle || 'Evinizin büyüklüğüne göre özel olarak hazırlanmış depolama çözümleri'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {sizes.map((item: any, index: number) => {
            const Icon = (Icons as any)[item.icon];
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-primary transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                <div className={`${item.color} p-6`}>
                  <div className="flex items-center gap-4">
                    <Icon className="w-12 h-12 flex-shrink-0 text-primary" />
                    <div className="text-right flex-1">
                      <div className="text-2xl font-bold text-gray-900">{item.size}</div>
                      <div className="text-lg font-semibold text-gray-700">{item.title}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                  
                  <div className="space-y-2 mb-4 flex-1">
                    {item.examples?.map((example: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                        <span>{example}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2 text-sm pt-2 border-t border-gray-100 mt-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      <span className="font-bold text-green-700">{item.highlight}</span>
                    </div>
                  </div>

                  <div className="pt-4 bg-orange-50 -mx-6 -mb-6 px-6 pb-6 mt-auto">
                    <div className="text-sm text-gray-500 mb-1">Başlangıç fiyatı</div>
                    <div className="text-2xl font-bold text-primary">{item.price}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {description && (
          <div className="mt-12 max-w-4xl mx-auto text-center">
            <p className="text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
