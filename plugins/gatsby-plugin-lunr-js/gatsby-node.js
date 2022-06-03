const fs = require("fs")
const striptags = require("striptags")
const lunr = require("lunr")
const {GraphQLJSONObject} = require("graphql-type-json")

exports.createResolvers = ({cache, createResolvers}) => {
  createResolvers({
    Query: {
      LunrIndex: {
        type: GraphQLJSONObject,
        resolve: async (source, args, context, info) => {
          const type = info.schema.getType("Mdx")
          const { entries } = await context.nodeModel.findAll({
            type: "Mdx",
          })
          return createIndex(entries, type, cache)
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
  const store = {}
  const index = lunr(function() {
    this.ref("path")
    this.field("title", {boost: 10})
    this.field("body")
    this.field("categories", {boost: 10})
    for (const node of blogNodes) {
      const { path } = node.fields
      const { title } = node.frontmatter
      const doc = {
        path,
        title,
        categories: node.frontmatter.categories ? node.frontmatter.categories.join(",") : null,
        body: striptags(node.html),
      }
      store[path] = {
        title
      }
      this.add(doc)
    }
  })
  const json = { index: index.toJSON(), store }
  await cache.set(cacheKey, json)
  return json
}
