import type { GatsbyConfig, PluginRef } from 'gatsby';
import 'dotenv/config';
import i18nextConfig from './i18next-config';

const { defaultLanguage, languages, ns } = i18nextConfig;

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
const siteUrl =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:8000/'
    : 'https://romanrud.com/';

const config: GatsbyConfig = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.mjs
    // Used for the title template on pages other than the index site
    siteTitle: 'site_headline',
    // Default title of the page
    siteTitleAlt: 'site_headline',
    // Can be used for e.g. JSONLD
    siteHeadline: 'site_headline',
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: 'https://romanrud.com',
    // Used for SEO
    siteDescription: 'seo_site_description',
    // Will be set on the <html /> tag
    siteLanguage: 'en',
    // Used for og:image and must be placed inside the 'static' folder
    siteImage: '/R.jpeg',
    // Twitter Handle
    author: 'Roman Rud',
  },
  trailingSlash: 'always',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/locales`,
        name: 'locale',
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale',
        languages,
        defaultLanguage,
        redirect: true,
        i18nextOptions: {
          debug: process.env.NODE_ENV === 'development',
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          interpolation: {
            escapeValue: false,
          },
          detection: {
            order: ['path', 'cookie', 'navigator'],
            caches: ['cookie'],
            cookieMinutes: 160,
          },
        },
        pages: [
          {
            matchPath: '/:lang?/blog/:uid',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang?/books/:uid',
            getLanguageFromPath: true,
          },
        ],
      },
    },
    {
      resolve: '@lekoarts/gatsby-theme-minimal-blog',
      // See the theme's README for all available options
      options: {
        i18n: true,
        navigation: [
          {
            title: 'navigation_blog_btn',
            slug: '/blog',
          },
        ],
        externalLinks: [
          {
            name: 'Instagram',
            url: 'https://www.instagram.com/romanruddd/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'GA-TRACKING_ID', // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: 'OPT_CONTAINER_ID',
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          // head: false,
          // Setting this parameter is also optional
          // sectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'minimal-blog - @lekoarts/gatsby-theme-minimal-blog',
        short_name: 'minimal-blog',
        description:
          'Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.',
        start_url: '/',
        background_color: '#fff',
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: '#6B46C1',
        display: 'standalone',
        icons: [
          {
            src: '/R.jpeg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            src: '/R.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allPost },
            }: {
              query: {
                allPost: IAllPost;
                site: { siteMetadata: ISiteMetadata };
              };
            }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug;
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': content }],
                };
              }),
            query: `{
                      allPost(sort: {date: DESC}) {
                        nodes {
                          title
                          date(formatString: "MMMM D, YYYY")
                          excerpt
                          slug
                        }
                      }
                    }`,
            output: `rss.xml`,
            title: `Minimal Blog - @lekoarts/gatsby-theme-minimal-blog`,
          },
        ],
      },
    },
    shouldAnalyseBundle && {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        reportFilename: '_bundle.html',
        openAnalyzer: false,
      },
    },
    `gatsby-plugin-react-helmet`,
  ].filter(Boolean) as Array<PluginRef>,
};

export default config;

interface IPostTag {
  name: string;
  slug: string;
}

interface IPost {
  slug: string;
  title: string;
  defer: boolean;
  date: string;
  excerpt: string;
  contentFilePath: string;
  html: string;
  timeToRead: number;
  wordCount: number;
  tags: Array<IPostTag>;
  banner: any;
  description: string;
  canonicalUrl: string;
}

interface IAllPost {
  nodes: Array<IPost>;
}

interface ISiteMetadata {
  siteTitle: string;
  siteTitleAlt: string;
  siteHeadline: string;
  siteUrl: string;
  siteDescription: string;
  siteImage: string;
  author: string;
}
