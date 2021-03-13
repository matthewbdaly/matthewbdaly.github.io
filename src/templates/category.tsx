import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Category = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMdx
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "": "s"
  } in category "${category}"`

  return (
    <Layout title={categoryHeader}>
      <SEO
        title={category}
        description={category}
      />
      {edges.map(({ node }) => {
        return (
          <Link to={node.fields.path} key={node.fields.path}>
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
