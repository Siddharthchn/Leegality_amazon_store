const SITE_NAME = 'Amazon Store'
const SITE_DESCRIPTION =
  'Browse and shop a wide selection of products including smartphones, laptops, beauty, fashion, and more at Amazon Store.'

export function getSiteName() {
  return SITE_NAME
}

export function getSiteDescription() {
  return SITE_DESCRIPTION
}

export function getCanonicalUrl(path = '/') {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }
  return path
}

export function buildPageTitle(title) {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}

export function buildProductListSchema(products, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Products',
    url: pageUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: getCanonicalUrl(`/product/${product.id}`),
      item: {
        '@type': 'Product',
        name: product.title,
        image: product.thumbnail,
        description: product.description,
        brand: { '@type': 'Brand', name: product.brand },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  }
}

export function buildProductSchema(product, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images?.length ? product.images : [product.thumbnail],
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews?.length ?? 0,
      bestRating: 5,
      worstRating: 1,
    },
    review: product.reviews?.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.reviewerName },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.comment,
    })),
  }
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
