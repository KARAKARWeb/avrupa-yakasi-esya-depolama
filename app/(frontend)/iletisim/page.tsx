import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { generateBreadcrumbSchema, generateContactPageSchema } from '@/lib/schema';
import { promises as fs } from 'fs';
import path from 'path';

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);
  const seoSettings = settings.seoSettings?.contact || {};

  return {
    title: seoSettings.title || 'İletişim',
    description: seoSettings.description || 'Eşya depolama hizmeti için bizimle iletişime geçin',
    keywords: seoSettings.keywords || 'iletişim, telefon, whatsapp, email, adres',
  };
}

export default async function ContactPage() {
  const config = await getSiteConfig();
  
  const filePath = path.join(process.cwd(), 'data', 'homepage-settings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const settings = JSON.parse(fileContents);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'İletişim' },
    ],
    config.site.domain
  );

  const contactPageSchema = generateContactPageSchema(config);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <PageHeader
        title="İletişim"
        description={settings?.pageHeaders?.iletisim || "7/24 müşteri hizmetleri ile size yardımcı olmaya hazırız"}
        breadcrumbs={[{ label: 'İletişim' }]}
        siteName={config.site.name}
        variant="gradient"
      />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Sol Taraf - İletişim Bilgileri (2 kolon) */}
            <div className="lg:col-span-2 space-y-6">
              {/* İletişim Kartları */}
              <div className="space-y-4">
                {/* Telefon */}
                <a
                  href={`tel:${config.contact.phone}`}
                  className="block bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Telefon</p>
                      <p className="text-lg font-semibold text-gray-900">{config.contact.phone}</p>
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}?text=Merhaba`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-green-500 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">WhatsApp</p>
                      <p className="text-lg font-semibold text-gray-900">{config.contact.whatsapp}</p>
                    </div>
                  </div>
                </a>

                {/* E-posta */}
                <a
                  href={`mailto:${config.contact.email}`}
                  className="block bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">E-posta</p>
                      <p className="text-base font-semibold text-gray-900 break-all">{config.contact.email}</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Adres */}
              <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Adres</p>
                    <p className="text-base text-gray-900 leading-relaxed">{config.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Form (3 kolon) */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
