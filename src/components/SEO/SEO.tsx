import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://smilestudioexperts.com'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

const defaultSEO = {
  title: 'Smile Studio Experts | Dentista en Chimalhuacán y Polanco, CDMX',
  description:
    'Clínica dental especializada en estética y salud bucal. Blanqueamiento, ortodoncia, diseño de sonrisa, prótesis y limpieza dental en Chimalhuacán y Polanco. Agenda tu cita hoy.',
  canonical: SITE_URL,
  ogImage: `${SITE_URL}/og-image.png`
}

export const SEO = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  canonical = defaultSEO.canonical,
  ogImage = defaultSEO.ogImage
}: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
  </Helmet>
)

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Smile Studio Experts',
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  telephone: '+525545021633',
  email: 'smilestudioexperts@outlook.com',
  description:
    'Clínica dental especializada en estética y salud bucal. Blanqueamiento, ortodoncia, diseño de sonrisa, prótesis y limpieza dental.',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'C. 16 de Septiembre',
      addressLocality: 'Chimalhuacán',
      addressRegion: 'Estado de México',
      addressCountry: 'MX'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Homero 1425, Polanco II Secc',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      addressCountry: 'MX'
    }
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.4029471,
    longitude: -98.98412
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '12:00',
      closes: '18:00'
    }
  ],
  priceRange: '$$',
  areaServed: ['Chimalhuacán', 'Polanco', 'Ciudad de México', 'Estado de México'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Dentales',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blanqueamiento dental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ortodoncia' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño de sonrisa' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Prótesis dental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Valoración y limpieza dental' } }
    ]
  },
  sameAs: [
    'https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr',
    'https://www.instagram.com/smilestudioexperts',
    'https://www.tiktok.com/@jesusodontotrembo'
  ]
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Smile Studio Experts',
  url: SITE_URL,
  inLanguage: 'es',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
}

export const StructuredData = () => (
  <>
    <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
  </>
)
