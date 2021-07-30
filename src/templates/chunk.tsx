import React, { Fragment } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import NavBlock from "../components/NavBlock"
import SEO from "../components/Seo"
import { PageContext, PageData, SiteData } from "../Types"
import PostExcerpt from "../components/PostExcerpt"

interface Props {
  pageContext: PageContext;
  data: {
    site: SiteData;
    mdx: PageData;
  }
}

const Chunk = ({ pageContext, data }: Props): React.ReactElement => {
  const siteTitle = data.site.siteMetadata.title
  const { currentPage, nextPage, previousPage } = pageContext

  return (
    <Fragment>
      <SEO
        title={`Page ${currentPage}`}
        description={`${siteTitle} - Page ${currentPage}`}
      />
      <Layout title={siteTitle} siteUrl={data.site.siteMetadata.siteUrl}>
        <div className="space-y-32">
          {data.allMdx.edges.map(({ node }) => (
            <PostExcerpt key={node.fields.path} path={node.fields.path} title={node.frontmatter.title} date={node.frontmatter.date} excerpt={node.excerpt} />
          ))}
        </div>

        <NavBlock
          previous={previousPage && {path: `/posts/${previousPage}`, title: `Page ${previousPage}`}}
          next={nextPage && {path: `/posts/${nextPage}`, title: `Page ${nextPage}`}}
        />

      </Layout>
    </Fragment>
  )
}

export default Chunk

export const chunkQuery = graphql`
query($skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
      siteUrl
    }
  }
  allMdx(
  sort: { fields: [frontmatter___date], order: DESC}
  filter: { frontmatter: { layout: { eq: "post" }}}
  limit: $limit
  skip: $skip
  ) {
    totalCount
    edges {
      node {
        excerpt
        fields {
          path
        }
        frontmatter {
          title
          date(formatString: "DD MMMM YYYY")
        }
      }
    }
  }
}
`
