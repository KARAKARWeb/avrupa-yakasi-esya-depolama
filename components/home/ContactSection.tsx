import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactSectionProps {
  config: any;
}

export default function ContactSection({ config }: ContactSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">İletişim</h2>
          <p className="text-lg text-gray-600">
            Hemen teklif alın veya bizimle iletişime geçin
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <a href={`tel:${config.contact.phone}`} className="text-gray-600 hover:text-primary">
                      {config.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">E-posta</p>
                    <a href={`mailto:${config.contact.email}`} className="text-gray-600 hover:text-primary">
                      {config.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Adres</p>
                    <p className="text-gray-600">{config.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Çalışma Saatleri</p>
                    <p className="text-gray-600">
                      Pzt-Cuma: {config.business.hours.weekdays.open} - {config.business.hours.weekdays.close}
                    </p>
                    <p className="text-gray-600">
                      Cumartesi: {config.business.hours.saturday.open} - {config.business.hours.saturday.close}
                    </p>
                    <p className="text-gray-600">
                      Pazar: {config.business.hours.sunday.open} - {config.business.hours.sunday.close}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.0!2d${config.location.lng}!3d${config.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1str!2str!4v1234567890`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
