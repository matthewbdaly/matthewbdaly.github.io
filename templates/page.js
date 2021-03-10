import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import CodeBlock from "../src/components/CodeBlock"

import Layout from "../src/components/layout"

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}

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
          <MDXRenderer components={components}>{page.body}</MDXRenderer>
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
    mdx(fields: { path: { eq: $path }}, frontmatter: {layout: {eq: "page"}}) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
