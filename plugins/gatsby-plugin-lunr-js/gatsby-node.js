const fs = require("fs")
const striptags = require("striptags")
const lunr = require("lunr")
const {GraphQLJSONObject} = require("graphql-type-json")

exports.createResolvers = ({cache, createResolvers}) => {
  createResolvers({
    Query: {
      LunrIndex: {
        type: GraphQLJSONObject,
        resolve: (source, args, context, info) => {
          const blogNodes = context.nodeModel.getAllNodes({
            type: "mdx",
          })
          const type = info.schema.getType("mdx")
          return createIndex(blogNodes, type, cache)
        }
      }
    }
  })
}

const createIndex = async (blogNodes, type, cache) => {
  const cacheKey = "IndexLunr"
  const cached = await cache.get(cacheKey)
  if (cached) {
    return cached
  }
  const documents = []
  const store = {}
  // Iterate over all posts
  for (const node of blogNodes) {
    const {path} = node.fields
    const title = node.frontmatter.title
    const [html, excerpt] = await Promise.all([
      type.getFields().html.resolve(node),
      type.getFields().excerpt.resolve(node, { pruneLength: 40 }),
    ])
    documents.push({
      path: node.fields.path,
      title: node.frontmatter.title,
      categories: node.frontmatter.categories ? node.frontmatter.categories.join(",") : null,
      body: striptags(html),
    })
    store[path] = {
      title,
      excerpt
    }
  }
  const index = lunr(function() {
    this.ref("path")
    this.field("title", {boost: 10})
    this.field("body")
    this.field("categories", {boost: 10})
    for (const doc of documents) {
      this.add(doc)
    }
  })
  const json = { index: index.toJSON(), store }
  await cache.set(cacheKey, json)
  return json
}
