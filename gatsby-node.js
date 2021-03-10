const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./templates/page.js`)
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

  pages.forEach((page, index) => {
    createPage({
      path: page.node.fields.path,
      component: pageTemplate,
      context: {
      },
    })
  })

  const postTemplate = path.resolve(`./templates/post.js`)
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
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {

    let value;
    if (node.frontmatter.layout === "post") {
      value = node.fileAbsolutePath.replace(/.+\/(\d+)-(\d+)-(\d+)-([\w*-]+)\.md$/, '/blog/$1/$2/$3/$4/')
    } else {
      value = node.fileAbsolutePath.replace(/([\w*-]+)\.md$/, '/$1/')
    }

    createNodeField({
      name: `path`,
      node,
      value,
    })
  }
}
