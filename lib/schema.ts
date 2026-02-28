export function generateLocalBusinessSchema(config: any) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SelfStorage'],
    name: config.site.name,
    image: `https://${config.site.domain}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address,
      addressLocality: config.location.city,
      addressRegion: config.location.city,
      postalCode: '34303',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.location.lat,
      longitude: config.location.lng,
    },
    url: `https://${config.site.domain}`,
    telephone: config.contact.phone,
    priceRange: '₺₺',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: config.business.hours.weekdays.open,
        closes: config.business.hours.weekdays.close,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: config.business.hours.saturday.open,
        closes: config.business.hours.saturday.close,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: config.business.hours.sunday.open,
        closes: config.business.hours.sunday.close,
      },
    ],
  };
}

export function generateFAQSchema(faq: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>, domain: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `https://${domain}${item.url}` }),
    })),
  };
}

export function generateAggregateRatingSchema(stats: any) {
  return {
    '@type': 'AggregateRating',
    ratingValue: stats.averageRating.toString(),
    reviewCount: stats.totalReviews.toString(),
    bestRating: '5',
    worstRating: '1',
  };
}

export function generateOrganizationSchema(config: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.site.name,
    url: `https://${config.site.domain}`,
    logo: `https://${config.site.domain}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: config.contact.phone,
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: 'Turkish',
    },
    sameAs: [
      config.social.facebook,
      config.social.instagram,
      config.social.twitter,
      config.social.linkedin,
    ].filter(Boolean),
  };
}

export function generateServiceSchema(config: any, prices: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Eşya Depolama Hizmeti',
    provider: {
      '@type': 'LocalBusiness',
      name: config.site.name,
      telephone: config.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.contact.address,
        addressLocality: config.location.city,
        postalCode: '34303',
        addressCountry: 'TR',
      },
    },
    serviceType: 'Self Storage',
    areaServed: {
      '@type': 'City',
      name: config.location.city,
    },
    offers: prices.packages?.map((pkg: any) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    })) || [],
  };
}

export function generateContactPageSchema(config: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `İletişim - ${config.site.name}`,
    url: `https://${config.site.domain}/iletisim`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: config.site.name,
      telephone: config.contact.phone,
      email: config.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.contact.address,
        addressLocality: config.location.city,
        postalCode: '34303',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: config.location.lat,
        longitude: config.location.lng,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: config.business.hours.weekdays.open,
          closes: config.business.hours.weekdays.close,
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: config.business.hours.saturday.open,
          closes: config.business.hours.saturday.close,
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: config.business.hours.sunday.open,
          closes: config.business.hours.sunday.close,
        },
      ],
    },
  };
}
