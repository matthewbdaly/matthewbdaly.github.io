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
      <p className="font-bold text-2xl py-2">Hi, I&apos;m Matthew Daly.</p>
      <p className="text-xl py-2">I&apos;m a web developer, and have worked in the industry for about a decade now. I live in Norfolk and work in Norwich (except during lockdown, when I've been working from home).</p>
      <p className="text-xl py-2">Right now, I work with Laravel and React.js, and on maintaining and migrating a legacy Zend 1 project.
       I&apos;ve also worked with Django, Angular 1, CodeIgniter, Backbone.js and Phonegap in the past.</p>
      <p className="text-xl py-2">I blog about the challenges of and solutions for dealing with legacy code, web app performance,
      modern PHP and Javascript developlment, and anything else I find interesting.</p>
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
