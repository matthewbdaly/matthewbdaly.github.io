module.exports = {
  siteMetadata: {
    title: `Matthew Daly's Blog`,
    author: {
      name: `Matthew Daly`,
      summary: `who lives in Norfolk and works in Norwich (except during the lockdown, when he's been working from home).`,
    },
    description: `I'm a web developer in Norfolk. This is my blog...`,
    siteUrl: `https://matthewdaly.co.uk`,
    social: {
      twitter: `mattbd`,
    },
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    `gatsby-plugin-postcss`,
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-17043630-1",
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [{
          serialize: ({ query: { site, allMdx } }) => {
            return allMdx.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.path,
                guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                custom_elements: [{ "content:encoded": edge.node.html }],
              })
            })
          },
          query: `
            {
              allMdx (
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: { frontmatter: {layout: {eq: "post"}}}
                limit: 100
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        path
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
            }
          `,
          output: `/rss.xml`,
          title: "Matthew Daly's Blog"
        }]
      },
    },

    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
  ],
};
