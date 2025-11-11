/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'webpage' | 'article' | 'product';
  customData?: Record<string, any>;
}

/**
 * StructuredData Component
 * Injects JSON-LD structured data for enhanced SEO
 * Helps search engines understand page content and display rich snippets
 */
export const StructuredData: React.FC<StructuredDataProps> = ({ 
  type = 'organization',
  customData 
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techbrand.vercel.app';

  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'TechBrand',
          description: 'Modern web design and development solutions for businesses',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          sameAs: [
            'https://twitter.com/techbrand',
            'https://facebook.com/techbrand',
            'https://linkedin.com/company/techbrand',
            'https://github.com/techbrand',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-555-123-4567',
            contactType: 'Customer Service',
            areaServed: 'US',
            availableLanguage: ['English'],
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Tech Street',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            postalCode: '94102',
            addressCountry: 'US',
          },
          foundingDate: '2020',
          founder: {
            '@type': 'Person',
            name: 'TechBrand Team',
          },
          ...customData,
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'TechBrand - Modern Landing Page',
          description: 'Build fast, responsive, and beautiful websites that convert visitors into customers',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          publisher: {
            '@type': 'Organization',
            name: 'TechBrand',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`,
            },
          },
          ...customData,
        };

      case 'webpage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'TechBrand - Modern Landing Page',
          description: 'Professional web design and development services',
          url: baseUrl,
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
              },
            ],
          },
          mainEntity: {
            '@type': 'Organization',
            name: 'TechBrand',
          },
          ...customData,
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: customData?.headline || 'TechBrand Landing Page',
          description: customData?.description || 'Modern web solutions',
          image: customData?.image || `${baseUrl}/og-image.jpg`,
          author: {
            '@type': 'Organization',
            name: 'TechBrand',
          },
          publisher: {
            '@type': 'Organization',
            name: 'TechBrand',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`,
            },
          },
          datePublished: customData?.datePublished || new Date().toISOString(),
          dateModified: customData?.dateModified || new Date().toISOString(),
          ...customData,
        };

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: customData?.name || 'Web Development Services',
          description: customData?.description || 'Professional web development and design',
          brand: {
            '@type': 'Brand',
            name: 'TechBrand',
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: customData?.lowPrice || '99',
            highPrice: customData?.highPrice || '999',
            offerCount: customData?.offerCount || '3',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: customData?.ratingValue || '4.9',
            reviewCount: customData?.reviewCount || '127',
          },
          ...customData,
        };

      default:
        return customData || {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

/**
 * Multiple Structured Data Types Component
 * Allows injecting multiple schema types on the same page
 */
export const MultipleStructuredData: React.FC<{
  schemas: Array<{ type: StructuredDataProps['type']; customData?: Record<string, any> }>;
}> = ({ schemas }) => {
  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={index} type={schema.type} customData={schema.customData} />
      ))}
    </>
  );
};

/**
 * Breadcrumb Structured Data
 */
export const BreadcrumbStructuredData: React.FC<{
  items: Array<{ name: string; url: string }>;
}> = ({ items }) => {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2),
      }}
    />
  );
};

/**
 * FAQ Structured Data
 */
export const FAQStructuredData: React.FC<{
  faqs: Array<{ question: string; answer: string }>;
}> = ({ faqs }) => {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2),
      }}
    />
  );
};

export default StructuredData;
