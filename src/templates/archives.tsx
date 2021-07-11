import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { PageData, SiteData } from "../Types"

interface Props {
  data: {
    site: SiteData;
    allMdx: {
      edges: PageData[];
    }
  }
}

const Archives = ({ data }: Props): React.ReactElement => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle} siteUrl={data.site.siteMetadata.siteUrl}>
      <SEO
        title={"Archives"}
        description={"Post archive"}
      />
      {data.allMdx.edges.map(({ node }) => {
        return (
          <section key={node.fields.path} className="w-full py-2">
            <Link className="float-left w-full text-2xl font-bold" to={node.fields.path}>
              {node.frontmatter.title}
            </Link>
            <p className="float-left py-2">{node.frontmatter.date}</p>
          </section>
        )
      })}
    </Layout>
  )
}

export default Archives

export const postsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMdx(
      filter: {frontmatter: {layout: {eq: "post"}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            path
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
          }
        }
      }
    }
  }
`
