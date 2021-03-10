const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

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

  const chunkTemplate = path.resolve('./templates/chunk.js')
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/posts/${i + 1}`,
      component: chunkTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        previousPage: i > 0 ? null : i - 1,
        nextPage: (i + 1) >= numPages ? null : i + 1
      },
    })
  })

  const categoryTemplate = path.resolve('./templates/category.js')

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
      path: `/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {

    if (node.frontmatter.layout === "post") {
      createNodeField({
        name: `path`,
        node,
        value: node.fileAbsolutePath.replace(/.+\/(\d+)-(\d+)-(\d+)-([\w*-]+)\.md$/, '/blog/$1/$2/$3/$4/')
      })
    }
    if (node.frontmatter.layout === "page") {
      createNodeField({
        name: `path`,
        node,
        value: node.fileAbsolutePath.replace(/.+\/([\w*-]+)\.md$/, '/$1/')
      })
    }
  }
}
