import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import TextSection from "../components/TextSection"
import SEO from "../components/Seo"
import { DiscussionEmbed } from "disqus-react"

const PostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const disqusConfig = {
      shortname: "matthewdaly",
      config: {
        url: data.site.siteMetadata.siteUrl + post.fields.path,
        identifier: post.fields.path,
        title: post.frontmatter.title,
        languge: 'en_GB',
      },
  }

  return (
    <Layout location={location} title={siteTitle}>
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
        <DiscussionEmbed {...disqusConfig} />
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

export default PostTemplate

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(fields: { path: { eq: $path }}, frontmatter: {layout: {eq: "post"}}) {
      id
      body
      excerpt(pruneLength: 160)
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
