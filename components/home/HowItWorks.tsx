import * as Icons from 'lucide-react';

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: any[];
}

export default function HowItWorks({ title, subtitle, steps = [] }: HowItWorksProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || 'Süreç Nasıl İşliyor?'}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle || '5 basit adımda eşyalarınızı güvenle depolayın'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = (Icons as any)[step.icon];
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300"
              >
                {/* Number and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{step.number}</span>
                  </div>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-primary">⚡ Hızlı Hizmet:</span> Ortalama süreç süresi 24 saat
          </p>
        </div>
      </div>
    </section>
  );
}
