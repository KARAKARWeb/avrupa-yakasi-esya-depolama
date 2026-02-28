'use client';

import { useState } from 'react';
import { Check, Package, Truck, Info, TrendingDown } from 'lucide-react';

interface PricingProps {
  prices: any;
  storagePrices?: any[];
  movingPrices?: any[];
  label?: string;
  heading?: string;
  description?: string;
}

export default function Pricing({ prices, storagePrices: storagePricesProp, movingPrices: movingPricesProp, label, heading, description }: PricingProps) {
  const [activeTab, setActiveTab] = useState<'storage' | 'moving'>('storage');

  // Depo Fiyatları - Props'tan veya default
  const storagePrices = storagePricesProp || [
    { 
      type: '1+0 Daire', 
      volume: '8 m³', 
      price: '2.700 ₺',
      stock: '8 Boş',
      features: ['Küçük daireler için', 'Temel eşyalar', 'Kısa süreli']
    },
    { 
      type: '1+1 Daire', 
      volume: '17 m³', 
      price: '4.000 ₺',
      stock: '12 Boş',
      features: ['Orta büyüklük daireler', 'Standart eşyalar', 'Uygun fiyat']
    },
    { 
      type: '2+1 Daire', 
      volume: '24 m³', 
      price: '6.500 ₺',
      stock: '7 Boş',
      popular: true,
      features: ['Geniş daireler', 'Çok sayıda eşya', 'En popüler']
    },
    { 
      type: '3+1 Daire', 
      volume: '30 m³', 
      price: '7.500 ₺',
      stock: '5 Boş',
      features: ['Büyük daireler', 'Tüm ev eşyaları', 'Uzun süreli']
    },
    { 
      type: '4+1 Daire', 
      volume: '40 m³', 
      price: '11.000 ₺',
      stock: '2 Boş',
      features: ['Çok büyük daireler', 'Tam ev taşıma', 'Premium hizmet']
    },
  ];

  // Nakliyat Fiyatları - Props'tan veya default
  const movingPrices = movingPricesProp || [
    { 
      type: '1+0 Ev Taşıma', 
      price: '10.000 ₺',
      features: ['Profesyonel ekip', 'Paketleme malzemesi', 'Sigortalı taşıma']
    },
    { 
      type: '1+1 Ev Taşıma', 
      price: '15.000 ₺',
      features: ['Profesyonel ekip', 'Paketleme malzemesi', 'Sigortalı taşıma']
    },
    { 
      type: '2+1 Ev Taşıma', 
      price: '22.000 ₺',
      popular: true,
      features: ['Profesyonel ekip', 'Paketleme malzemesi', 'Sigortalı taşıma']
    },
    { 
      type: '3+1 Ev Taşıma', 
      price: '28.000 ₺',
      features: ['Profesyonel ekip', 'Paketleme malzemesi', 'Sigortalı taşıma']
    },
    { 
      type: '4+1 Ev Taşıma', 
      price: '37.000 ₺',
      features: ['Profesyonel ekip', 'Paketleme malzemesi', 'Sigortalı taşıma']
    },
  ];

  const totalStock = storagePrices.reduce((sum: number, item: any) => {
    const stockNum = typeof item.stock === 'string' ? parseInt(item.stock) || 0 : item.stock || 0;
    return sum + stockNum;
  }, 0);

  // JSON-LD Schema for SEO
  const storageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Eşya Depolama Fiyatları",
    "description": "Daire tipine göre aylık eşya depolama fiyatları ve metreküp bilgileri",
    "numberOfItems": storagePrices.length,
    "itemListElement": storagePrices.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": `${item.type} Eşya Depolama`,
        "description": `${item.volume} metreküp depolama alanı - ${item.type} için uygun`,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "TRY",
          "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "availability": item.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "Eşya Depolama Hizmetleri"
          }
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Depo Hacmi",
            "value": `${item.volume} metreküp`
          },
          {
            "@type": "PropertyValue",
            "name": "Stok Durumu",
            "value": `${item.stock} boş depo mevcut`
          }
        ]
      }
    }))
  };

  const movingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Evden Depoya Nakliyat Fiyatları",
    "description": "Daire tipine göre profesyonel evden depoya taşıma hizmeti fiyatları",
    "numberOfItems": movingPrices.length,
    "itemListElement": movingPrices.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": `${item.type} Evden Depoya Taşıma`,
        "description": `${item.type} için profesyonel evden depoya nakliyat hizmeti`,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "TRY",
          "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Eşya Depolama Hizmetleri"
          }
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movingSchema) }}
      />
      
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-4">
              <span className="text-primary font-semibold text-sm">{label || 'FİYATLANDIRMA'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{heading || 'Şeffaf ve Uygun Fiyatlar'}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description || 'Daire tipinize göre özel fiyatlandırma ve profesyonel taşıma hizmetleri'}
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-2 border-2 border-gray-100 inline-flex gap-2">
              <button
                onClick={() => setActiveTab('storage')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'storage'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Depo Fiyatları</span>
              </button>
              <button
                onClick={() => setActiveTab('moving')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'moving'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Truck className="w-5 h-5" />
                <span>Nakliyat Fiyatları</span>
              </button>
            </div>
          </div>

          {/* Depo Fiyatları Tablosu */}
          {activeTab === 'storage' && (
            <div>
              <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-primary to-primary-dark text-white">
                        <th className="px-3 md:px-6 py-3 md:py-4 text-left font-bold text-sm md:text-base">Daire Tipi</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-center font-bold text-sm md:text-base">Metreküp</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-center font-bold text-sm md:text-base">Aylık Ücret</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-center font-bold text-sm md:text-base">Stok Durumu</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-left font-bold text-sm md:text-base">Özellikler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storagePrices.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`${
                            item.popular 
                              ? 'bg-blue-50 border-l-4 border-primary' 
                              : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          } hover:bg-blue-50/50 transition-colors`}
                        >
                          <td className="px-3 md:px-6 py-4 md:py-5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-base md:text-lg font-bold text-gray-900">{item.type}</span>
                              {item.popular && (
                                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                                  POPÜLER
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                            <div className="inline-block bg-blue-100 px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
                              <span className="text-base md:text-lg font-bold text-blue-700">{item.volume}</span>
                            </div>
                          </td>
                          <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                            <div className="text-xl md:text-2xl font-bold text-primary">
                              {item.price}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Aylık</div>
                          </td>
                          <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                            <div className="inline-flex items-center gap-2 bg-green-100 px-2 md:px-3 py-1.5 md:py-2 rounded-lg">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs md:text-sm font-semibold text-green-700">
                                {item.stock}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 md:px-6 py-4 md:py-5">
                            <div className="space-y-1">
                              {item.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Check className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
                                  <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stok Bilgisi */}
              <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 font-semibold">Müsait Depo Sayısı</div>
                        <div className="text-2xl font-bold text-green-600">{totalStock} Boş Depo</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-700">Stokta Var: 1-{totalStock} Arası</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nakliyat Fiyatları Tablosu */}
          {activeTab === 'moving' && (
            <div>
              <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-accent to-orange-600 text-white">
                        <th className="px-3 md:px-6 py-3 md:py-4 text-left font-bold text-sm md:text-base">Daire Tipi</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-center font-bold text-sm md:text-base">Taşıma Ücreti</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-left font-bold text-sm md:text-base">Hizmet Kapsamı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movingPrices.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`${
                            item.popular 
                              ? 'bg-orange-50 border-l-4 border-accent' 
                              : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          } hover:bg-orange-50/50 transition-colors`}
                        >
                          <td className="px-3 md:px-6 py-4 md:py-5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-base md:text-lg font-bold text-gray-900">{item.type}</span>
                              {item.popular && (
                                <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-semibold">
                                  POPÜLER
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                            <div className="text-xl md:text-2xl font-bold text-accent">
                              {item.price}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Tek Seferlik</div>
                          </td>
                          <td className="px-3 md:px-6 py-4 md:py-5">
                            <div className="space-y-1">
                              {item.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Check className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
                                  <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
