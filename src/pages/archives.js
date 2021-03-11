import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"

const Archives = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      {data.allMdx.edges.map(({ node }) => {
        return (
          <Link to={node.fields.path} key={node.fields.path}>
            {node.frontmatter.title}
          </Link>
        );
      })}
    </Layout>
  )
}

export default Archives

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
