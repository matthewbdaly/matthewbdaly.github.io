import React, { Fragment } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import TextSection from "../components/TextSection"
import NavBlock from "../components/NavBlock"
import Tag from "../components/Tag"
import SEO from "../components/Seo"
import { DiscussionEmbed } from "disqus-react"
import { PageContext, PageData, SiteData } from "../Types"

interface Props {
  pageContext: PageContext;
  data: {
    site: SiteData;
    mdx: PageData;
  }
  location: Location;
}

const PostTemplate = ({ location, pageContext, data }: Props): React.ReactElement => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const canonicalUrl = data.site.siteMetadata.siteUrl + location.pathname
  const disqusConfig = {
    shortname: "matthewdaly",
    config: {
      url: data.site.siteMetadata.siteUrl + post.fields.path,
      identifier: post.fields.path,
      title: post.frontmatter.title,
      languge: "en_GB",
    },
  }

  return (
    <Fragment>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        url={canonicalUrl}
      />
      <Layout title={siteTitle}>
        <article className="h-entry">
          <header>
            <h2 className="py-4 text-2xl font-bold e-content p-name">
              <a className="u-url" href={data.site.siteMetadata.siteUrl + post.fields.path}>{post.frontmatter.title}</a>
            </h2>
            {post.frontmatter.inReplyTo && <div className="italic">In reply to <a rel="in-reply-to" href={post.frontmatter.inReplyTo}>{post.frontmatter.inReplyTo}</a></div>}
            <p className="my-4 text-lg font-semibold">Published by <a href="/" rel="author">Matthew Daly</a> at {post.frontmatter.date}</p>
            <time className="hidden dt-published">{post.frontmatter.isoDate}</time>
          </header>
          <TextSection>{post.body}</TextSection>
          <hr />
          <div className="py-4">
            {post.frontmatter.categories && post.frontmatter.categories.map((category: string) => <Tag key={category} category={category} />)}
          </div>

          <NavBlock
            previous={previous && {path: previous.fields.path, title: previous.frontmatter.title}}
            next={next && {path: next.fields.path, title: next.frontmatter.title}}
          />

          <DiscussionEmbed {...disqusConfig} />
        </article>
      </Layout>
    </Fragment>
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
    excerpt(pruneLength: 180)
    frontmatter {
      title
      date(formatString: "Do MMMM YYYY h:mm a")
      isoDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
      categories
      inReplyTo
    }
    fields {
      path
    }
  }
}
`
