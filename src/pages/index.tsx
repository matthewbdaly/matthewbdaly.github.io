import React, { memo } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import RecentPosts from "../components/RecentPosts"
import { PageData, SiteData } from "../Types"

interface Props {
  data: {
    site: SiteData;
    mdx: PageData;
  }
}

const Index = ({ data }: Props): React.ReactElement => {
  const siteTitle = data.site.siteMetadata.title
  const RecentPostsComponent = memo(RecentPosts)

  return (
    <Layout title={siteTitle} siteUrl={data.site.siteMetadata.siteUrl}>
      <SEO
        title={"Home"}
        description={"Home"}
      />
      <RecentPostsComponent />
    </Layout>
  )
}

export default Index

export const recentPostsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
