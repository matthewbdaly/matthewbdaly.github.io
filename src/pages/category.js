import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Category = ({ pageContext, data, location }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMdx
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "": "s"
  } in category "${category}"`

  return (
    <Layout location={location} title={categoryHeader}>
      {edges.map(({ node }) => {
        return (
          <Link to={node.fields.path}>
            {node.frontmatter.title}
          </Link>
        )
      })}
    </Layout>
  )
}

export default Category

export const categoryQuery = graphql`
  query($category: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC}
      filter: { frontmatter: { categories: { in: [$category] }}}
    ) {
      totalCount
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
