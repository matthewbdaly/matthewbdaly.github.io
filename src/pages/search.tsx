import React, { memo } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import RecentPosts from "../components/RecentPosts"
import SearchResults from "../components/SearchResults"
import queryString from 'query-string'

const Search = ({ location, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const RecentPostsComponent = memo(RecentPosts)
  const search = queryString.parse(location.search)

  return (
    <Layout title={siteTitle}>
      <SEO
        title={`Home`}
        description={`Home`}
      />
      <SearchResults value={search.s} />
      <RecentPostsComponent />
    </Layout>
  )
}

export default Search

export const siteDataQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
