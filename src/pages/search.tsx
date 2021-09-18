import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import SearchResults from "../components/SearchResults"
import queryString from "query-string"
import { SiteData } from "../Types"

interface Props {
  data: {
    site: SiteData;
  },
  location: Location;
}

const Search = ({ location, data }: Props): React.ReactElement => {
  const siteTitle = data.site.siteMetadata.title
  const search = queryString.parse(location.search)
  const canonicalUrl = data.site.siteMetadata.siteUrl + location.pathname

  return (
    <Layout title={siteTitle} siteUrl={data.site.siteMetadata.siteUrl}>
      <SEO
        title={"Home"}
        description={"Home"}
        url={canonicalUrl}
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
        siteUrl
      }
    }
  }
`
