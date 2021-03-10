import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../src/components/layout"

const Chunk = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      {data.allMdx.edges.map(({ node }) => {
        return (
          <section>
            <Link to={node.fields.path}>
              {node.frontmatter.title}
            </Link>
            {node.excerpt}
          </section>
        )
      })}
    </Layout>
  )
}

export default Chunk

export const chunkQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      filter: { frontmatter: { layout: { eq: "post" }}}
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          excerpt
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