import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import kebabCase from "lodash/kebabCase"

type Category = {
    totalCount: number,
    category: string
}

const Categories = ({ data: {
  allMdx: { group },
  site: {
    siteMetadata: { title },
  }
}}) => {

  return (
    <Layout title={title}>
      <SEO
        title={`Categories`}
        description={`Categories`}
      />
        {group.map((node: Category) => {
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
