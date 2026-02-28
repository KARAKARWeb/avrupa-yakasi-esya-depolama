import Hero from '@/components/home/Hero';
import ServiceRegionsQuick from '@/components/home/ServiceRegionsQuick';
import Services from '@/components/home/Services';
import SeoContent from '@/components/home/SeoContent';
import Features from '@/components/home/Features';
import SecurityInfrastructure from '@/components/home/SecurityInfrastructure';
import StorageSizes from '@/components/home/StorageSizes';
import HowItWorks from '@/components/home/HowItWorks';
import SecurityInsurance from '@/components/home/SecurityInsurance';
import InsurancePackages from '@/components/home/InsurancePackages';
import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import Reviews from '@/components/home/Reviews';
import Gallery from '@/components/home/Gallery';
import CTASection from '@/components/home/CTASection';
import { getSiteConfig, getPrices, getServices, getFeatures, getFAQ, getReviews, getGallery, getRegions } from '@/lib/data';
import { generateLocalBusinessSchema, generateFAQSchema, generateOrganizationSchema } from '@/lib/schema';
import { getHomepageSettings } from '@/lib/actions/homepage-settings';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const homepageSettings = await getHomepageSettings();
  const seoSettings = homepageSettings.seoSettings?.homepage || {};
  
  return {
    title: seoSettings.title || 'Avrupa Yakası Eşya Depolama',
    description: seoSettings.description || 'Güvenli ve uygun fiyatlı eşya depolama hizmeti',
    keywords: seoSettings.keywords || '',
  };
}

export default async function HomePage() {
  const [config, prices, services, features, faq, reviews, gallery, regions, homepageSettings] = await Promise.all([
    getSiteConfig(),
    getPrices(),
    getServices(),
    getFeatures(),
    getFAQ(),
    getReviews(),
    getGallery(),
    getRegions(),
    getHomepageSettings(),
  ]);

  const localBusinessSchema = generateLocalBusinessSchema(config);
  const faqSchema = generateFAQSchema(faq.faqs);
  const organizationSchema = generateOrganizationSchema(config);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Hero 
        mainHeading={homepageSettings?.hero?.mainHeading || config.site.name}
        description={homepageSettings?.hero?.description || ''}
        trustBadges={homepageSettings?.hero?.trustBadges}
        config={config} 
        prices={prices}
        formSettings={homepageSettings?.priceCalculatorForm}
      />
      <ServiceRegionsQuick 
        regions={[
          { name: 'Esenyurt Eşya Depolama', slug: 'esenyurt-esya-depolama' },
          { name: 'Beylikdüzü Eşya Depolama', slug: 'beylikduzu-esya-depolama' },
          { name: 'Zeytinburnu Eşya Depolama', slug: 'zeytinburnu-esya-depolama' },
          { name: 'Avcılar Eşya Depolama', slug: 'avcilar-esya-depolama' },
          { name: 'Silivri Eşya Depolama', slug: 'silivri-esya-depolama' },
          { name: 'Şişli Eşya Depolama', slug: 'sisli-esya-depolama' },
          { name: 'Sarıyer Eşya Depolama', slug: 'sariyer-esya-depolama' },
          { name: 'Beşiktaş Eşya Depolama', slug: 'besiktas-esya-depolama' },
          { name: 'Bakırköy Eşya Depolama', slug: 'bakirkoy-esya-depolama' },
          { name: 'Bağcılar Eşya Depolama', slug: 'bagcilar-esya-depolama' },
          { name: 'Fatih Eşya Depolama', slug: 'fatih-esya-depolama' },
          { name: 'Başakşehir Eşya Depolama', slug: 'basaksehir-esya-depolama' },
          { name: 'Beyoğlu Eşya Depolama', slug: 'beyoglu-esya-depolama' },
          { name: 'Büyükçekmece Eşya Depolama', slug: 'buyukcekmece-esya-depolama' },
          { name: 'Çatalca Eşya Depolama', slug: 'catalca-esya-depolama' },
          { name: 'Arnavutköy Eşya Depolama', slug: 'arnavutkoy-esya-depolama' },
          { name: 'Bahçelievler Eşya Depolama', slug: 'bahcelievler-esya-depolama' },
          { name: 'Bayrampaşa Eşya Depolama', slug: 'bayrampasa-esya-depolama' },
        ]}
      />
      <SeoContent 
        title={homepageSettings?.seo1?.title || "Eşya Depolama Hakkında"}
        content={homepageSettings?.seo1?.content || `
          <p class="mb-4">
            <strong>Eşya depolama</strong>, ev taşınması, tadilat, iş değişikliği veya mevsimlik eşyaların saklanması gibi durumlarda ihtiyaç duyulan profesyonel bir hizmettir. 
            Modern self storage tesislerimizde, eşyalarınızı güvenli ve hijyenik koşullarda saklayabilirsiniz.
          </p>
          <p class="mb-4">
            Depolarımız 7/24 kamera sistemi, yangın algılama ve söndürme sistemleri ile donatılmıştır. 
            Her depo ünitesi kilitli ve sadece sizin erişiminize açıktır. Klimalı depo seçeneklerimizle hassas eşyalarınızı nem ve sıcaklık değişimlerinden koruyoruz.
          </p>
          <p class="mb-4">
            <strong>Metreküp bazlı fiyatlandırma</strong> sistemimiz sayesinde sadece kullandığınız alan kadar ödeme yaparsınız. 
            1 m³'den 100 m³'e kadar farklı depo boyutlarımız mevcuttur. Uzun süreli depolama için özel indirimler sunuyoruz.
          </p>
          <p>
            Profesyonel taşıma ve paketleme hizmetlerimizle eşyalarınızı güvenli şekilde depoya taşıyoruz. 
            Sigorta seçeneklerimizle eşyalarınız tam güvence altında. Hemen teklif alın, depolama ihtiyacınız için en uygun çözümü bulun.
          </p>
        `}
      />
      <Services 
        services={homepageSettings?.services?.services || services.services} 
        title={homepageSettings?.services?.title}
        subtitle={homepageSettings?.services?.subtitle}
        description={homepageSettings?.services?.description}
      />
      <Features 
        features={homepageSettings?.features?.features || features.features}
        title={homepageSettings?.features?.title}
        subtitle={homepageSettings?.features?.subtitle}
        description={homepageSettings?.features?.description}
      />
      <HowItWorks 
        title={homepageSettings?.howItWorks?.title}
        subtitle={homepageSettings?.howItWorks?.subtitle}
        steps={homepageSettings?.howItWorks?.steps}
      />
      <StorageSizes 
        title={homepageSettings?.storageSizes?.title}
        subtitle={homepageSettings?.storageSizes?.subtitle}
        description={homepageSettings?.storageSizes?.description}
        packages={homepageSettings?.storageSizes?.packages}
      />
      <SecurityInfrastructure 
        title={homepageSettings?.securityInfrastructure?.title}
        subtitle={homepageSettings?.securityInfrastructure?.subtitle}
        features={homepageSettings?.securityInfrastructure?.features}
      />
      <SecurityInsurance 
        title={homepageSettings?.securityInsurance?.title}
        label={homepageSettings?.securityInsurance?.label}
        subtitle={homepageSettings?.securityInsurance?.subtitle}
        features={homepageSettings?.securityInsurance?.features}
      />
      <Gallery 
        title={homepageSettings?.gallery?.title}
        subtitle={homepageSettings?.gallery?.subtitle}
        images={homepageSettings?.gallery?.images || gallery.images} 
      />
      <InsurancePackages 
        title={homepageSettings?.insurancePackages?.title}
        subtitle={homepageSettings?.insurancePackages?.subtitle}
        infoTitle={homepageSettings?.insurancePackages?.infoTitle}
        infoText1={homepageSettings?.insurancePackages?.infoText1}
        infoText2={homepageSettings?.insurancePackages?.infoText2}
        benefits={homepageSettings?.insurancePackages?.benefits}
        packages={homepageSettings?.insurancePackages?.packages}
      />
      <Pricing 
        prices={prices} 
        storagePrices={homepageSettings?.pricing?.storagePrices}
        movingPrices={homepageSettings?.pricing?.movingPrices}
        label={homepageSettings?.pricing?.label}
        heading={homepageSettings?.pricing?.heading}
        description={homepageSettings?.pricing?.description}
      />
      <FAQ 
        title={homepageSettings?.faq?.title}
        subtitle={homepageSettings?.faq?.subtitle}
        faq={homepageSettings?.faq?.questions || faq.faqs} 
      />
      <Reviews reviews={homepageSettings?.reviews?.reviews || reviews.reviews} />
      <SeoContent 
        title={homepageSettings?.seo2?.title || "Güvenli Eşya Depolama Çözümleri"}
        content={homepageSettings?.seo2?.content || `
          <p class="mb-4">
            <strong>Profesyonel eşya depolama hizmeti</strong> arıyorsanız doğru yerdesiniz. Modern tesislerimizde eşyalarınızı güvenle saklayabilir, 
            istediğiniz zaman erişim sağlayabilirsiniz. Ev taşınması, tadilat, iş değişikliği veya mevsimlik eşya saklama ihtiyaçlarınız için ideal çözümler sunuyoruz.
          </p>
          <p class="mb-4">
            7/24 güvenlik kamerası, yangın algılama sistemi ve sigorta güvencesi ile eşyalarınız tam koruma altında. 
            Klimalı depo seçeneklerimiz sayesinde hassas eşyalarınızı nem ve sıcaklık değişimlerinden koruyoruz.
          </p>
          <p class="mb-4">
            <strong>Esnek fiyatlandırma</strong> sistemimizle sadece kullandığınız alan kadar ödeme yaparsınız. 
            1 m³'den 100+ m³'e kadar farklı depo boyutları mevcuttur. Uzun süreli depolama için özel indirimlerimizden yararlanabilirsiniz.
          </p>
          <p>
            Ücretsiz taşıma hizmeti, profesyonel paketleme desteği ve 7/24 müşteri hizmetleri ile yanınızdayız. 
            Hemen iletişime geçin, size özel teklif alalım.
          </p>
        `}
      />
      <CTASection 
        phone={config.contact.phone} 
        whatsapp={config.contact.whatsapp}
        title={homepageSettings?.cta?.title}
        description={homepageSettings?.cta?.description}
      />
    </>
  );
}
