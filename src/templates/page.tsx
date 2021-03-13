import React from "react"
import { graphql } from "gatsby"
import TextSection from "../components/TextSection"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const PageTemplate = ({ data }) => {
  const page = data.mdx
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
      />
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
        <TextSection>{page.body}</TextSection>
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
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`