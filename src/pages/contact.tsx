import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { SiteData } from "../Types"
import SEO from "../components/Seo"
import ContactForm from "../components/ContactForm"

interface Props {
  data: {
    site: SiteData;
  },
  location: Location;
}

const Contact = ({ location, data }: Props): ReactElement => {
  const siteTitle = data.site.siteMetadata.title
  const canonicalUrl = data.site.siteMetadata.siteUrl + location.pathname

  return (
    <Layout title={siteTitle}>
      <SEO
        title={"Contact"}
        description={"Contact me"}
        url={canonicalUrl}
      />
      <h1 className="mb-4 text-2xl font-bold">Contact me</h1>
      <p>You can contact me with this form, but please bear in mind the following:</p>
      <ul className="py-2 pl-4">
        <li className="list-disc">This is strictly a personal blog, and I'm not interested in posting guest posts, so please don't ask. Nor am I interested in letting you rebuild it.</li>
        <li className="list-disc">I'm also not interested in reviewing commercial products unless they're directly useful to me in my work. Given I don't generally get on with graphical IDE's, <i className="italic">please</i> don't ask me to review your PHP IDE - even if I were to say yes, I won't have a good experience with it, and my review will reflect that.</li>
      </ul>
      <ContactForm />
    </Layout>
  )
}

export default Contact

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
