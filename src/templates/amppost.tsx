import React from "react"
import { Link, graphql } from "gatsby"
import AmpLayout from "../components/AmpLayout"
import SEO from "../components/Seo"
import TextSection from "../components/TextSection"

const AmpPostTemplate = ({ data, pageContext }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <AmpLayout title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
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
    </AmpLayout>
  )
}

export default AmpPostTemplate

export const ampPostQuery = graphql`
  query AmpBlogPostByPath($amppath: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(fields: { amppath: { eq: $amppath }}, frontmatter: {layout: {eq: "post"}}) {
      id
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        path
        amppath
      }
    }
  }
`