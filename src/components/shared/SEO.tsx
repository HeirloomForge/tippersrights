interface SEOProps {
  title: string
  description: string
  path: string
  ogImage?: string
  ogType?: string
  jsonLd?: Record<string, unknown>
}

export default function SEO({ title, description, path, ogImage, ogType, jsonLd }: SEOProps) {
  const siteUrl = 'https://tippersbillofrights.com'
  const fullUrl = `${siteUrl}${path}`
  const fullTitle = `${title} | Tipper's Bill of Rights`
  const image = ogImage || `${siteUrl}/images/og-default.png`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:site_name" content="Tipper's Bill of Rights" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </>
  )
}
