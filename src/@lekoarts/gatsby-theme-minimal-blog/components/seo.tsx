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

type LinkTag = {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
  hrefLang?: string;
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

  // Convert all values to strings and handle translations
  const finalTitle = String(title || defaultTitle || '');
  const finalDescription = String(description || defaultDescription || '');
  const finalSiteTitle = String(siteTitle || '');
  const finalLanguage = String(language || siteLanguage || 'en');
  const finalAuthor = String(author || '');

  const seo = {
    title: finalTitle,
    description: finalDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  }

  // Create an array of meta tags to avoid nesting issues
  const metaTags = [
    { name: "description", content: seo.description },
    { name: "image", content: seo.image },
    { property: "og:title", content: seo.title },
    { property: "og:url", content: seo.url },
    { property: "og:description", content: seo.description },
    { property: "og:image", content: seo.image },
    { property: "og:type", content: "website" },
    { property: "og:image:alt", content: seo.description },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:url", content: seo.url },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: seo.image },
    { name: "twitter:image:alt", content: seo.description },
    { name: "twitter:creator", content: finalAuthor },
    { name: "gatsby-theme", content: "@lekoarts/gatsby-theme-minimal-blog" },
  ];

  // Create an array of link tags
  const linkTags: LinkTag[] = [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: withPrefix(`/favicon-32x32.png`),
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: withPrefix(`/favicon-16x16.png`),
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: withPrefix(`/apple-touch-icon.png`),
    },
  ];

  // Add canonical and hreflang links if available
  if (canonicalUrl) {
    linkTags.push({ rel: "canonical", href: canonicalUrl });
  }

  if (localizedUrls) {
    linkTags.push(
      { rel: "alternate", hrefLang: "en", href: `${siteUrl}${localizedUrls.en}` },
      { rel: "alternate", hrefLang: "uk", href: `${siteUrl}/uk${localizedUrls.uk}` },
      { rel: "alternate", hrefLang: "ru", href: `${siteUrl}/ru${localizedUrls.ru}` },
      { rel: "alternate", hrefLang: "x-default", href: `${siteUrl}${localizedUrls.en}` }
    );
  }

  return (
    <Helmet
      htmlAttributes={{ lang: finalLanguage }}
      title={finalTitle}
      defaultTitle={String(defaultTitle)}
      titleTemplate={`%s | ${finalSiteTitle}`}
      meta={metaTags}
      link={linkTags}
    >
      {children}
    </Helmet>
  )
}

export default Seo
