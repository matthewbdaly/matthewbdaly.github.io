const path = require("path")
const _ = require("lodash")
const Feed = require("feed").Feed
const fs = require("fs")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve("./src/templates/page.tsx")
  const pageResult = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: {layout: {eq: "page"}}}
        ) {
          edges {
            node {
              fields {
                path
              }
              frontmatter {
                title
                layout
              }
            }
          }
        }
      }
    `
  )

  if (pageResult.errors) {
    throw pageResult.errors
  }

  // Create pages.
  const pages = pageResult.data.allMdx.edges

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.path,
      component: pageTemplate,
      context: {
      },
    })
  })

  const postTemplate = path.resolve("./src/templates/post.tsx")
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: {layout: {eq: "post"}}}
          limit: 1000
        ) {
          edges {
            node {
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
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.path,
      component: postTemplate,
      context: {
        previous,
        next,
      },
    })
  })

  const chunkTemplate = path.resolve("./src/templates/chunk.tsx")
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    const currentPage = (i + 1)
    createPage({
      path: `/posts/${currentPage}`,
      component: chunkTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage,
        previousPage: currentPage > 1 ? currentPage - 1 : null,
        nextPage: currentPage >= numPages ? null : currentPage + 1
      },
    })
  })

  const archivesTemplate = path.resolve("./src/templates/archives.tsx")
  createPage({
    path: "/blog/archives/",
    component: archivesTemplate,
  })

  const categoriesTemplate = path.resolve("./src/templates/categories.tsx")
  createPage({
    path: "/blog/categories/",
    component: categoriesTemplate,
  })

  const categoryTemplate = path.resolve("./src/templates/category.tsx")

  const categoryResult = await graphql(`
    {
      categoriesGroup: allMdx(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }
    }
  `)

  if (categoryResult.errors) {
    throw categoryResult.errors
  }
  const categories = categoryResult.data.categoriesGroup.group
  categories.forEach(category => {
    createPage({
      path: `/blog/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue
      }
    })
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {

    if (node.frontmatter.layout === "post") {
      const url = node.fileAbsolutePath.replace(/.+\/(\d+)-(\d+)-(\d+)-([\w*-]+)\.md$/, "/blog/$1/$2/$3/$4/")
      createNodeField({
        name: "path",
        node,
        value: url
      })
    }
    if (node.frontmatter.layout === "page") {
      createNodeField({
        name: "path",
        node,
        value: node.fileAbsolutePath.replace(/.+\/([\w*-]+)\.md$/, "/$1/")
      })
    }
  }
}

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
        link: post.node.fields.path,
        id: post.node.fields.path,
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
