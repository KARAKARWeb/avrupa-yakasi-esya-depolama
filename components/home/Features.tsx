import Card from '@/components/ui/Card';
import * as Icons from 'lucide-react';

interface FeaturesProps {
  features: any[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function Features({ features, title, subtitle, description }: FeaturesProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || 'Neden Biz?'}</h2>
          <p className="text-lg text-gray-600">
            {subtitle || 'Eşya depolama hizmetinde fark yaratan özelliklerimiz'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const IconComponent = (Icons as any)[feature.icon];
            return (
              <Card key={feature.id} hover className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  {IconComponent && <IconComponent className="w-8 h-8 text-accent" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
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
