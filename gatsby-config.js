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
    "gatsby-plugin-image",
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
        name: "posts",
        path: "./src/posts/",
      },
      __key: "posts",
    },
    {
      resolve: 'gatsby-callback-paths',
      options: {
        matchNodeType: 'Mdx',
        extract: [
          {
            name: 'path',
            callback: (node) => {
              if (node.fileAbsolutePath.indexOf('posts') > -1) {
                return node.fileAbsolutePath.replace(/.+\/(\d+)-(\d+)-(\d+)-([\w*-]+)\.md$/, '/blog/$1/$2/$3/$4/')
              } else {
                return node.fileAbsolutePath.replace(/([\w*-]+)\.md$/, '/$1/')
              }
            }
          },
          {
            name: 'date',
            callback: (node) => {
              return node.fileAbsolutePath.replace(/.+\/(\d+-\d+-\d+)-[\w*-]+\.md$/, '$1')
            }
          }
        ]
      }
    },
  ],
};
