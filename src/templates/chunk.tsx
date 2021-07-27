import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import NavBlock from "../components/NavBlock"
import SEO from "../components/Seo"
import { PageContext, PageData, SiteData } from "../Types"

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
        <Fragment>
          {data.allMdx.edges.map(({ node }) => {
            return (
              <section key={node.fields.path} className="w-full py-2">
                <Link className="float-left w-full text-2xl font-bold" to={node.fields.path}>
                  {node.frontmatter.title}
                </Link>
                <p className="float-left py-2">{node.frontmatter.date}</p>
                <p className="float-left py-2">{node.excerpt}</p>
              </section>
            )
          })}
        </Fragment>

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
