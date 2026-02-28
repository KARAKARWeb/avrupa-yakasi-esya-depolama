import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import { getSiteConfig } from '@/lib/data';
import { readFile } from 'fs/promises';
import { join } from 'path';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const seoConfigPath = join(process.cwd(), 'data', 'seo-config.json');
  const seoConfig = JSON.parse(await readFile(seoConfigPath, 'utf-8'));
  
  const metadata: Metadata = {
    title: config.site.title,
    description: config.site.description,
    keywords: config.site.keywords,
    authors: [{ name: config.site.name }],
    creator: config.site.name,
    publisher: config.site.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: config.site.title,
      description: config.site.description,
      url: `https://${config.site.domain}`,
      siteName: config.site.name,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `https://${config.site.domain}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: config.site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.site.title,
      description: config.site.description,
      images: [`https://${config.site.domain}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://${config.site.domain}`,
    },
  };

  if (seoConfig.analytics?.gscVerification) {
    metadata.verification = {
      google: seoConfig.analytics.gscVerification,
    };
  }

  return metadata;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();
  const seoConfigPath = join(process.cwd(), 'data', 'seo-config.json');
  const seoConfig = JSON.parse(await readFile(seoConfigPath, 'utf-8'));
  
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <meta name="google-site-verification" content="LPL0ro5I9Z93WpAXywsaf1RJZsOE48hzZxVKdtHAK1U" />
        {seoConfig.googleAnalyticsId && <GoogleAnalytics gaId={seoConfig.googleAnalyticsId} />}
        {seoConfig.googleTagManagerId && <GoogleTagManager gtmId={seoConfig.googleTagManagerId} />}
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
