module.exports = {
  siteMetadata: {
    title: "Matthew Daly",
    author: {
      name: "Matthew Daly",
      summary: "who lives in Norfolk and works in Norwich (except during the lockdown, when he's been working from home).",
    },
    description: "I'm a web developer in Norfolk. This is my blog...",
    siteUrl: "https://matthewdaly.co.uk/",
    social: {
      twitter: "mattbd",
      github: "matthewbdaly",
      email: "matthew@matthewdaly.co.uk"
    },
  },
  plugins: [
    "gatsby-plugin-all-feeds",
    "gatsby-plugin-lunr-js",
    {
      resolve: "gatsby-plugin-csp",
      options: {
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          "default-src": "'self' *.google-analytics.com disqus.com *.disqus.com *.disquscdn.com getform.io",
          "child-src": "'self'",
          "frame-src": "disqus.com *.addthis.com",
          "object-src": "'none'",
          "font-src": "'self' data: fonts.google-apis.com fonts.gstatic.com",
          "style-src": "'self' fonts.googleapis.com *.addthis.com google-analytics.com *.disquscdn.com *.disqus.com 'unsafe-inline'",
          "script-src": "'self' localhost:* *.addthis.com *.google-analytics.com *.disquscdn.com *.disqus.com disqus.com *.addthisedge.com graph.facebook.com 'unsafe-inline' 'unsafe-eval'",
          "connect-src": "'self' ws://localhost:* *.google-analytics.com stats.g.doubleclick.net",
          "img-src": "'self' *.google-analytics.com *.disquscdn.com *.disqus.com stats.g.doubleclick.net",
          "form-action": "'self', getform.io"
        }
      }
    },
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-opensearch",
      options: {
        shortName: "Matthew Daly",
        description: "Search matthewdaly.co.uk",
        searchTemplate: "/search?s={searchTerms}",
        searchForm: "/search",
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-17043630-1",
      },
    },

    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
        name: "Matthew Daly's Blog",
        short_name: "Matthew Daly",
        start_url: "/",
        background_color: "white",
        theme_color: "#3b82f6",
        display: "standalone"
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
            }
          }
        ]
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-remark-images",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./src/content/pages/",
      },
      __key: "content",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/content/posts/",
      },
      __key: "posts",
    },
    "gatsby-plugin-meta-redirect"
  ],
}
