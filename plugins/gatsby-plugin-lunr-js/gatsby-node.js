const fs = require("fs")
const striptags = require("striptags")
const lunr = require("lunr")

exports.onPostBuild = async ({ graphql }) => {
  await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              html
              fields {
                path
              }
              frontmatter {
                title
                categories
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

    const store = {}

    const searchIndex = lunr(function() {
      this.field("title", { boost: 10})
      this.field("categories", { boost: 10})
      this.field("body")
      this.ref("path")

      result.data.allMdx.edges.forEach(post => {
        let doc
        doc = {
          "title": post.node.frontmatter.title,
          "categories": post.node.frontmatter.categories ? post.node.frontmatter.categories.join(",") : null,
          "body": striptags(post.node.html),
          "path": post.node.fields.path
        }
        store[doc.path] = {
          "title": doc.title
        }
        this.add(doc)
      })
    })
    fs.writeFileSync("public/search-index.json", JSON.stringify({
      index: searchIndex.toJSON(),
      store: store
    }))
  })
}
