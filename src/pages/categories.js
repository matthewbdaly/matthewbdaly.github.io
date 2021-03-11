import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import kebabCase from "lodash/kebabCase"

const Categories = ({ data: {
  allMdx: { group },
  site: {
    siteMetadata: { title },
  }
}, location }) => {

  return (
    <Layout location={location} title={title}>
      {group.map((node) => {
        return (
          <Link to={`/categories/${kebabCase(node.category)}/`} key={node.category}>
            {node.category} ({node.totalCount})
          </Link>
        );
      })}
    </Layout>
  )
}

export default Categories

export const categoriesQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx {
      group(field: frontmatter___categories) {
        category: fieldValue
        totalCount
      }
    }
  }
`
