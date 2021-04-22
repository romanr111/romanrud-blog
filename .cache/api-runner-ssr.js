var plugins = [{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[{"resolve":"/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-remark-images","id":"0c1a4f1b-2b47-52f8-b507-0590421487b0","name":"gatsby-remark-images","version":"3.11.1","pluginOptions":{"plugins":[],"maxWidth":960,"quality":90,"linkImagesToOriginal":false,"showCaptions":false,"markdownCaptions":false,"sizeByPixelDensity":false,"backgroundColor":"white","withWebp":false,"tracedSVG":false,"loading":"lazy","disableBgImageOnAlpha":false,"disableBgImage":false},"nodeAPIs":["pluginOptionsSchema"],"browserAPIs":["onRouteUpdate"],"ssrAPIs":[]}],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":960,"quality":90,"linkImagesToOriginal":false}}],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/Users/roman/Documents/Development/romanrud-blog"},
    },{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n    {\n      site {\n        siteMetadata {\n          title: siteTitle\n          description: siteDescription\n          siteUrl\n          site_url: siteUrl\n        }\n      }\n    }\n  ","feeds":[{"query":"\n        {\n          allPost(sort: { fields: date, order: DESC }) {\n            nodes {\n              title\n              date(formatString: \"MMMM D, YYYY\")\n              excerpt\n              slug\n              html\n            }\n          }\n        }\n      ","output":"rss.xml","title":"Minimal Blog - @lekoarts/gatsby-theme-minimal-blog"}]},
    },{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-theme-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"head":false,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0},
    },{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","createLinkInHead":true},
    },{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"minimal-blog - @lekoarts/gatsby-theme-minimal-blog","short_name":"minimal-blog","description":"Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.","start_url":"/","background_color":"#fff","theme_color":"#6B46C1","display":"standalone","icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":null},
    },{
      plugin: require('/Users/roman/Documents/Development/romanrud-blog/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
