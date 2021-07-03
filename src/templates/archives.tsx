import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Archives = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title={`Archives`}
        description={`Post archive`}
      />
      {data.allMdx.edges.map(({ node }) => {
        return (
          <section key={node.fields.path} className="w-full py-2">
            <Link className="float-left w-full text-2xl font-bold" to={node.fields.path}>
              {node.frontmatter.title}
            </Link>
            <p className="float-left py-2">{node.frontmatter.date}</p>
          </section>
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
            date(formatString: "DD MMMM YYYY")
            title
          }
        }
      }
    }
  }
`
