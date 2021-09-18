import React, { memo } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import RecentPosts from "../components/RecentPosts"
import { PageData, SiteData } from "../Types"

interface Props {
  location: Location;
  data: {
    site: SiteData;
    mdx: PageData;
  }
}

const Index = ({ data, location }: Props): React.ReactElement => {
  const siteTitle = data.site.siteMetadata.title
  const RecentPostsComponent = memo(RecentPosts)
  const canonicalUrl = data.site.siteMetadata.siteUrl + location.pathname

  return (
    <Layout title={siteTitle} siteUrl={data.site.siteMetadata.siteUrl}>
      <SEO
        title={"Home"}
        description={"Home"}
        url={canonicalUrl}
      />
      <p className="font-bold text-2xl py-2 p-note">Hi, I&apos;m <a className="h-card" rel="me" href={data.site.siteMetadata.siteUrl}>Matthew Daly</a>.</p>
      <p className="text-xl py-2">I&apos;m a web developer, and have worked in the industry for about a decade now. I live in Norfolk and work in Norwich (except during lockdown, when I&apos;ve been working from home).</p>
      <p className="text-xl py-2">Right now, I work with Laravel and React.js, and on maintaining and migrating a legacy Zend 1 project.
       I&apos;ve also worked with Django, Angular 1, CodeIgniter, Backbone.js and Phonegap in the past.</p>
      <p className="text-xl py-2">I blog about the challenges of and solutions for dealing with legacy code, web app performance,
      modern PHP and Javascript development, and anything else I find interesting.</p>
      <p className="text-xl py-2">You can find me on <a className="border-b-4 border-transparent hover:border-green-400 transition-colors duration-500" href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`} rel="me">Twitter</a> and <a className="border-b-4 border-transparent hover:border-green-400 transition-colors duration-500" href={`https://github.com/${data.site.siteMetadata.social.github}`} rel="me">GitHub</a></p>
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
        social {
          twitter
          github
        }
      }
    }
  }
`
