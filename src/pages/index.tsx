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
      <p className="font-bold text-2xl py-2">Hi, I'm Matthew Daly. I'm a web developer in East Anglia in the UK.</p>
      <p className="text-xl">I work primarily with Laravel and React.js.</p>
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
