import { CheckCircle } from 'lucide-react';

interface InsurancePackagesProps {
  title?: string;
  subtitle?: string;
  infoTitle?: string;
  infoText1?: string;
  infoText2?: string;
  benefits?: string[];
  packages?: any[];
}

export default function InsurancePackages({ title, subtitle, infoTitle, infoText1, infoText2, benefits, packages }: InsurancePackagesProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title || 'Ücretsiz Sigorta Paketleri'}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {subtitle || 'Daire tipinize göre belirlenen sigorta kapsamı, aylık depolama ücretinize tamamen ücretsiz dahildir'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1+1 Daire */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">1+1 Daire</div>
                <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg px-4 py-2">
                  <div className="text-xs text-green-700 font-semibold mb-1">Fiyata Dahil - Ücretsiz</div>
                  <div className="text-lg font-bold text-green-700">200.000₺</div>
                  <div className="text-xs text-green-600">Teminata Kadar</div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Yangın sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Hırsızlık sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Doğal afet güvencesi</span>
                </li>
              </ul>
            </div>

            {/* 2+1 Daire */}
            <div className="bg-white rounded-xl p-6 border-2 border-primary shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                POPÜLER
              </div>
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">2+1 Daire</div>
                <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg px-4 py-2">
                  <div className="text-xs text-green-700 font-semibold mb-1">Fiyata Dahil - Ücretsiz</div>
                  <div className="text-lg font-bold text-green-700">300.000₺</div>
                  <div className="text-xs text-green-600">Teminata Kadar</div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Yangın sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Hırsızlık sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Doğal afet güvencesi</span>
                </li>
              </ul>
            </div>

            {/* 3+1 Daire */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">3+1 Daire</div>
                <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg px-4 py-2">
                  <div className="text-xs text-green-700 font-semibold mb-1">Fiyata Dahil - Ücretsiz</div>
                  <div className="text-lg font-bold text-green-700">400.000₺</div>
                  <div className="text-xs text-green-600">Teminata Kadar</div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Yangın sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Hırsızlık sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Doğal afet güvencesi</span>
                </li>
              </ul>
            </div>

            {/* 4+1 Daire */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">4+1 Daire</div>
                <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg px-4 py-2">
                  <div className="text-xs text-green-700 font-semibold mb-1">Fiyata Dahil - Ücretsiz</div>
                  <div className="text-lg font-bold text-green-700">500.000₺</div>
                  <div className="text-xs text-green-600">Teminata Kadar</div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Yangın sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Hırsızlık sigortası</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Doğal afet güvencesi</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 border-2 border-primary/20">
            <div className="text-center">
              <h4 className="text-lg font-bold text-gray-900 mb-3">{infoTitle || 'Ücretsiz Sigorta Kapsamı ve Güvencesi'}</h4>
              {infoText1 && (
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {infoText1}
                </p>
              )}
              {infoText2 && (
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {infoText2}
                </p>
              )}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {(benefits || ['Ek ücret yok', 'Sözleşmeli güvence', 'Hukuki koruma', 'Şeffaf şartlar']).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
