import React from "react"
import { withPrefix } from 'gatsby';
import { Helmet } from "react-helmet"
import useSiteMetadata from "../hooks/use-site-metadata"
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
  canonicalUrl?: string
  localizedUrls?: {
    en: string
    uk: string
    ru: string
  }
}

const Seo = ({
  title = ``,
  description = ``,
  pathname = ``,
  image = ``,
  children = null,
  canonicalUrl = ``,
  localizedUrls,
}: SEOProps) => {
  const site = useSiteMetadata()
  const { language } = useI18next();
  const { t } = useTranslation();

  const {
    siteTitle,
    siteTitleAlt: defaultTitle,
    siteUrl,
    siteDescription: defaultDescription,
    siteImage: defaultImage,
    author,
    siteLanguage,
  } = site

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  }

  return (
    <Helmet title={seo.title} defaultTitle={defaultTitle} titleTemplate={`%s | ${siteTitle}`}>
      <html lang={language || siteLanguage} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      {/* Add hreflang tags for all language versions */}
      {localizedUrls && (
        <>
          <link rel="alternate" hrefLang="en" href={`${siteUrl}${localizedUrls.en}`} />
          <link rel="alternate" hrefLang="uk" href={`${siteUrl}/uk${localizedUrls.uk}`} />
          <link rel="alternate" hrefLang="ru" href={`${siteUrl}/ru${localizedUrls.ru}`} />
          <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${localizedUrls.en}`} />
        </>
      )}

      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={author} />
      <meta name="gatsby-theme" content="@lekoarts/gatsby-theme-minimal-blog" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={withPrefix(`/favicon-32x32.png`)}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={withPrefix(`/favicon-16x16.png`)}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={withPrefix(`/apple-touch-icon.png`)}
      />
      {children}
    </Helmet>
  )
}

export default Seo
