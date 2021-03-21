import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Card from "../components/Card"

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
        <div className="w-full">
      {edges.map(({ node }) => {
        return (
          <Link to={node.fields.path} key={node.fields.path}>
            <Card title={node.frontmatter.title} excerpt={node.excerpt} categories={node.frontmatter.categories} />
          </Link>
        )
      })}
            </div>
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
          excerpt(pruneLength: 80)
          frontmatter {
            title
            categories
          }
        }
      }
    }
  }
`
