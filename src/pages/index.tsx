import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Index = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title={`Home`}
        description={`Home`}
      />
      <h4>Recent posts</h4>
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

export default Index

export const recentPostsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {frontmatter: {layout: {eq: "post"}}}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
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
