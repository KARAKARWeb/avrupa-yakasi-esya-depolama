import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PriceCalculator from '@/components/forms/PriceCalculator';
import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import Reviews from '@/components/home/Reviews';
import { getSiteConfig, getRegions, getRegion, getPrices, getFAQ, getReviews } from '@/lib/data';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';

export async function generateStaticParams() {
  const regions = await getRegions();
  return regions.map((region: any) => ({
    slug: region.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const region = await getRegion(slug);
  const config = await getSiteConfig();

  if (!region) {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }

  return {
    title: `${region.name}`,
    description: region.description,
    keywords: [
      ...config.site.keywords,
      region.name.toLowerCase(),
      `${region.name.split(' ')[0].toLowerCase()} eşya depolama`,
      'güvenli depolama',
      'uygun fiyat',
    ],
    openGraph: {
      title: `${region.name} - ${config.site.name}`,
      description: region.description,
      url: `https://${config.site.domain}/${region.slug}`,
      siteName: config.site.name,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `https://${config.site.domain}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: region.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${region.name} - ${config.site.name}`,
      description: region.description,
      images: [`https://${config.site.domain}/og-image.jpg`],
    },
    alternates: {
      canonical: `https://${config.site.domain}/${region.slug}`,
    },
  };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [region, config, prices, faq, reviews] = await Promise.all([
    getRegion(slug),
    getSiteConfig(),
    getPrices(),
    getFAQ(),
    getReviews(),
  ]);

  if (!region) {
    notFound();
  }

  const localBusinessSchema = {
    ...generateLocalBusinessSchema(config),
    name: region.name,
    url: `https://${config.site.domain}/${region.slug}`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: region.name },
    ],
    config.site.domain
  );

  const faqSchema = generateFAQSchema(faq.faqs.slice(0, 5));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        title={`${region.name} Eşya Depolama`}
        description={region.description}
        breadcrumbs={[
          { label: `${region.name} Eşya Depolama` },
        ]}
        siteName={config.site.name}
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="prose prose-lg max-w-none">
                {region.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="sticky top-24">
              <PriceCalculator prices={prices} />
            </div>
          </div>
        </div>
      </section>

      <Pricing prices={prices} />
      <FAQ faq={faq.faqs.slice(0, 8)} />
      <Reviews reviews={reviews.reviews.slice(0, 6)} />
    </>
  );
}
