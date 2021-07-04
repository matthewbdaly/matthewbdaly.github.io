import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import SearchResults from "../components/SearchResults"
import queryString from 'query-string'

const Search = ({ location, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const search = queryString.parse(location.search)

  return (
    <Layout title={siteTitle}>
      <SEO
        title={`Home`}
        description={`Home`}
      />
      <SearchResults value={search.s} />
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
