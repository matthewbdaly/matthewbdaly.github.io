import * as React from "react"
import { graphql } from "gatsby"
import NavLink from "../components/NavLink"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { SiteData } from "../Types"

interface Props {
  data: {
    site: SiteData;
  }
  location: Location;
}

const NotFoundPage = ({ data, location }: Props): React.ReactElement => {
  const siteTitle = data.site.siteMetadata.title
  const canonicalUrl = data.site.siteMetadata.siteUrl + location.pathname

  return (
    <Layout title={siteTitle}>
      <SEO
        title={"Not found"}
        description={"Not found"}
        url={canonicalUrl}
      />
      <main>
        <title>Page not found</title>
        <h1 className="text-2xl">We can't find that page</h1>
        <p>
          Sorry, we couldn’t find what you were looking for.
          <br />
          {process.env.NODE_ENV === "development" ? (
            <>
              <br />
              Try creating a page in <code>src/pages/</code>.
              <br />
            </>
          ) : null}
          <br />
          <NavLink to="/" text="Go home" />
        </p>
      </main>
    </Layout>
  )
}

export default NotFoundPage

export const NotFoundQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
