import React, { Fragment } from "react"
import { graphql } from "gatsby"
import TextSection from "../components/TextSection"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { PageData, SiteData } from "../Types"

interface Props {
  data: {
    site: SiteData;
    mdx: PageData;
  }
}
const PageTemplate = ({ data }: Props): React.ReactElement => {
  const page = data.mdx
  const siteTitle = data.site.siteMetadata.title

  return (
    <Fragment>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
      />
      <Layout title={siteTitle} siteUrl={data.site.siteMetadata.siteUrl}>
        <article>
          <header className="text-2xl font-bold">
            <h2>
              {page.frontmatter.title}
            </h2>
          </header>
          <TextSection>{page.body}</TextSection>
          <hr
          />
        </article>
      </Layout>
    </Fragment>
  )
}

export default PageTemplate

export const pageQuery = graphql`
query PageByPath($path: String!) {
  site {
    siteMetadata {
      title
      siteUrl
    }
  }
  mdx(fields: { path: { eq: $path }}, frontmatter: {layout: {eq: "page"}}) {
    id
    body
    excerpt(pruneLength: 180)
    frontmatter {
      title
    }
  }
}
`
