require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
      // Used for the title template on pages other than the index site
      siteTitle: `Roman Rud`,
      // Default title of the page
      siteTitleAlt: `Roman Rud Blog`,
      // Can be used for e.g. JSONLD
      siteHeadline: `Roman Rud Blog`,
      // Will be used to generate absolute URLs for og:image etc.
      siteUrl: `https://romanrud.com`,
      // Used for SEO
      siteDescription: `Roman Rud Personal Blog`,
      // Will be set on the <html /> tag
      siteLanguage: `ru`,
      // Used for og:image and must be placed inside the `static` folder
      siteImage: `/R.jpeg`,
      // Twitter Handle
      author: `Roman Rud`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Блог`,
            slug: `/blog`,
          },
        ],
        externalLinks: [
          {
            name: `Instagram`,
            url: `https://www.instagram.com/romanruddd/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
        short_name: `minimal-blog`,
        description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/R.jpeg`,
            sizes: `192x192`,
            type: `image/jpeg`,
          },
          {
            src: `/R.jpeg`,
            sizes: `512x512`,
            type: `image/jpeg`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-netlify`,

    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}

