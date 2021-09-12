const Feed = require("feed").Feed
const fs = require("fs")

exports.onPostBuild = async ({ graphql }) => {
  await graphql(
    `
      {
        site {
          siteMetadata {
            title
            author {
              name
              summary
            }
            description
            siteUrl
            social {
              email
            }
          }
        }
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: {layout: {eq: "post"}}}
          limit: 10
        ) {
          edges {
            node {
              html
              fields {
                path
              }
              frontmatter {
                title
                date
                layout
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const year = new Date().getFullYear()
    const feed = new Feed({
      title: result.data.site.siteMetadata.title,
      description: result.data.site.siteMetadata.description,
      id: result.data.site.siteMetadata.siteUrl,
      link: result.data.site.siteMetadata.siteUrl,
      language: "en",
      copyright: `All rights reserved ${result.data.site.siteMetadata.author.name} ${year}`,
      generator: "GatsbyJS",
      author: {
        name: result.data.site.siteMetadata.author.name,
        email: result.data.site.siteMetadata.social.email,
        link: result.data.site.siteMetadata.siteUrl
      },
      favicon: `${result.data.site.siteMetadata.siteUrl}/favicon-32x32.png`,
      feedLinks: {
        json: "/feed.json",
        rss: "/rss.xml",
        atom: "/atom.xml"
      },
    })
    feed.addContributor({
      name: result.data.site.siteMetadata.author.name,
      email: result.data.site.siteMetadata.social.email,
      link: result.data.site.siteMetadata.siteUrl
    })

    result.data.allMdx.edges.forEach(post => {
      feed.addItem({
        title: post.node.frontmatter.title,
        link: result.data.site.siteMetadata.siteUrl + post.node.fields.path,
        id: result.data.site.siteMetadata.siteUrl + post.node.fields.path,
        date: new Date(post.node.frontmatter.date),
        content: post.node.html,
        author: {
          name: result.data.site.siteMetadata.author.name,
          email: result.data.site.siteMetadata.social.email,
          link: result.data.site.siteMetadata.siteUrl
        }
      })
    })
    fs.writeFileSync("public/atom.xml", feed.atom1())
    fs.writeFileSync("public/rss.xml", feed.rss2())
    fs.writeFileSync("public/feed.json", feed.json1())
  })
}
