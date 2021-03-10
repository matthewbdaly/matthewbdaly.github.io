import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const Archive = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      {data.allMdx.edges.map(({ node }) => {
        return (
          <Link to={node.fields.path}>
            {node.frontmatter.title}
          </Link>
        );
      })}
    </Layout>
  )
}

export default Archive

export const postsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {frontmatter: {layout: {eq: "post"}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            path
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
