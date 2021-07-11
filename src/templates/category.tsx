import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Category = ({ pageContext, data }): React.ReactElement => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMdx
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "": "s"
  } in category "${category}"`

  return (
    <Fragment>
      <SEO
        title={category}
        description={category}
      />
      <Layout title={categoryHeader}>
        <ul>
          {edges.map(({ node }) => (
            <li key={node.fields.path} className="p-2 text-xl font-bold">
              <Link to={node.fields.path}>
                {node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </Fragment>
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
        excerpt(pruneLength: 180)
        frontmatter {
          title
          categories
        }
      }
    }
  }
}
`
