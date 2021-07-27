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
}

const PostTemplate = ({ pageContext, data }: Props): React.ReactElement => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
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
      />
      <Layout title={siteTitle} siteUrl={data.site.siteMetadata.siteUrl}>
        <article>
          <header>
            <h2 className="py-4 text-2xl font-bold">
              {post.frontmatter.title}
            </h2>
            <p className="my-4 text-lg font-semibold">{post.frontmatter.date}</p>
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
      date(formatString: "DD MMMM YYYY")
      categories
    }
    fields {
      path
    }
  }
}
`
