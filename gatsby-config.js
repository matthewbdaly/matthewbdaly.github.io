module.exports = {
  siteMetadata: {
    title: "Matthew Daly's Blog",
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
      resolve: 'gatsby-callback-paths',
      options: {
        matchNodeType: 'Mdx',
        extract: [
          {
            name: 'path',
            callback: (node) => {
              if (node.fileAbsolutePath.indexOf('pages/blog') > -1) {
                return node.fileAbsolutePath.replace(/.+\/(\d+)-(\d+)-(\d+)-([\w*-]+)\.md$/, '/blog/$1/$2/$3/$4/')
              }
              return node.fileAbsolutePath.replace(/.+\/pages\/([\w*-]+)\.md$/, '/$1')
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
