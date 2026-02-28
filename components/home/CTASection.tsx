import { Phone, MessageCircle } from 'lucide-react';

interface CTASectionProps {
  phone: string;
  whatsapp: string;
  title?: string;
  description?: string;
}

export default function CTASection({ phone, whatsapp, title, description }: CTASectionProps) {
  const phoneDisplay = phone.replace(/\s/g, '').replace(/^(\+90)/, '0').replace(/^(\d{4})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
  const whatsappClean = whatsapp.replace(/\s/g, '');

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title || 'Hemen Teklif Alın!'}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {description || 'Profesyonel ekibimiz size en uygun depolama çözümünü sunmak için hazır. Ücretsiz fiyat teklifi için hemen iletişime geçin.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </a>
            
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">{phoneDisplay}</span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>7/24 Destek</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Ücretsiz Keşif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Hızlı Yanıt</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
