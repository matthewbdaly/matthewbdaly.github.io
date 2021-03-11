import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../src/components/Layout"

const Chunk = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { nextPage, previousPage } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      {data.allMdx.edges.map(({ node }) => {
        return (
          <section key={node.fields.path}>
            <Link to={node.fields.path}>
              {node.frontmatter.title}
            </Link>
            {node.excerpt}
          </section>
        )
      })}

      <nav>
        <ul
        >
          <li>
            {previousPage && (
              <Link to={`${previousPage > 1 ? `/posts/${previousPage}` : `/`}`} rel="prev">
                ← 
              </Link>
            )}
          </li>
          <li>
            {nextPage && (
              <Link to={`/posts/${nextPage}`} rel="next">
                →
              </Link>
            )}
          </li>
        </ul>
      </nav>

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
