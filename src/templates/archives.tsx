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
  location: Location;
}

const Archives = ({ data, location }: Props): React.ReactElement => {
  const siteTitle = data.site.siteMetadata.title
  const canonicalUrl = data.site.siteMetadata.siteUrl + location.pathname

  return (
    <Layout title={siteTitle}>
      <SEO
        title={"Archives"}
        description={"Post archive"}
        url={canonicalUrl}
      />
      <div className="space-y-16">
        {data.allMdx.edges.map(({ node }) => (
          <section key={node.fields.path} className="w-full py-4">
            <Link className="float-left w-full text-2xl font-bold" to={node.fields.path}>
              {node.frontmatter.title}
            </Link>
            <p className="float-left py-2">{node.frontmatter.date}</p>
          </section>
        ))}
      </div>
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
            date(formatString: "Do MMMM YYYY h:mm a")
            title
          }
        }
      }
    }
  }
`
