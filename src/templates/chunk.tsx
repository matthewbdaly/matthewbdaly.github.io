import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Chunk = ({ pageContext, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const { currentPage, nextPage, previousPage } = pageContext

  return (
    <Layout title={siteTitle}>
      <SEO
        title={`Page ${currentPage}`}
        description={`${siteTitle} - Page ${currentPage}`}
      />
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
              <Link to={`/posts/${previousPage}`} rel="prev">
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
