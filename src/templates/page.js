import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"

const PageTemplate = ({ data, pageContext, location }) => {
  const page = data.mdx
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <article>
        <header>
          <h1
          >
            {page.frontmatter.title}
          </h1>
          <p
          >
            {page.frontmatter.date}
          </p>
        </header>
        <section>
          <MDXRenderer>{page.body}</MDXRenderer>
        </section>
        <hr
        />
        <footer>
        </footer>
      </article>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { path: { eq: $path }, layout: {eq: "page"}}) {
      id
      html
      frontmatter {
        title
      }
      fields {
        path
        date(formatString: "MMMM DD, YYYY")
        layout
      }
    }
  }
`
