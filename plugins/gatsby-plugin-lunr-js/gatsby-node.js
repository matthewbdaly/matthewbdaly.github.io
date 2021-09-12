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

    const searchIndex = lunr(function() {
      this.field("title", { boost: 10})
      this.field("categories", { boost: 10})
      this.field("body")
      this.ref("path")
    })

    const store = {}

    result.data.allMdx.edges.forEach(post => {
      console.log(JSON.stringify(post))
      let doc = {
        "title": post.frontmatter.title,
        "categories": post.frontmatter.categories.join(","),
        "body": striptags(post.body),
        "path": post.fields.path
      }
      store[doc.href] = {
        "title": doc.title
      }
      searchIndex.add(doc)
    })
    fs.writeFileSync("public/search-index.json", JSON.stringify({
      index: searchIndex.toJSON(),
      store: store
    }))
  })
}
