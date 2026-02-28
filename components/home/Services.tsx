import Card from '@/components/ui/Card';
import * as Icons from 'lucide-react';

interface ServicesProps {
  services: any[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function Services({ services, title, subtitle, description }: ServicesProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {title || 'Hizmetlerimiz'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle || 'Tüm eşya depolama ihtiyaçlarınız için profesyonel çözümler'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '18px' }}>
          {services.map((service) => {
            const IconComponent = (Icons as any)[service.icon];
            return (
              <div 
                key={service.id} 
                className={`bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary transition-all duration-300 text-center ${service.id === 'parca-esya' ? 'hidden md:block' : ''}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
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
