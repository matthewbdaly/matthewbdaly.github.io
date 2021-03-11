import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../src/components/Layout"
import TextSection from "../src/components/TextSection"

const AmpPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <article>
        <header>
          <h1
          >
            {post.frontmatter.title}
          </h1>
          <p
          >
            {post.frontmatter.date}
          </p>
        </header>
        <TextSection>{post.body}</TextSection>
        <hr
        />
        <footer>
        </footer>
      </article>

      <nav>
        <ul
        >
          <li>
            {previous && (
              <Link to={previous.fields.path} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.path} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default AmpPostTemplate

export const ampPostQuery = graphql`
  query AmpBlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(fields: { path: { eq: $path }}, frontmatter: {layout: {eq: "post"}}) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        path
      }
    }
  }
`
