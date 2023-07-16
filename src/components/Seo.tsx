/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  description: string;
  lang: string;
  title: string;
  meta: Record<string, unknown>[];
  url: string;
}

const SEO = ({ description, lang, meta, title, url }: Props): React.ReactElement => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              github
              email
              mastodon
            }
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
      ].concat(meta)}
    >
      <link href={ url } rel="canonical" />
      <link href={`https://github.com/${site.siteMetadata.social.github}`} rel="me" />
      <link href={`${site.siteMetadata.social.mastodon}`} rel="me" />
      <link href={`mailto:${site.siteMetadata.social.email}`} rel="me" />
      <link href="/key.pub" rel="pgpkey" />
      <link href="https://webmention.io/matthewdaly.co.uk/xmlrpc" rel="pingback" />
      <link href="https://webmention.io/matthewdaly.co.uk/webmention" rel="webmention" />
      <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
      <link rel="token_endpoint" href="https://tokens.indieauth.com/token" />
      <link rel="openid.delegate" href={ site.siteMetadata.siteUrl } />
      <link rel="openid.server" href="https://openid.indieauth.com/openid" />
      <link rel="alternate" type="application/rss+xml" title={`${site.siteMetadata.title} - feed`} href="/rss.xml" />
      <link rel="alternate" type="application/atom+xml" title={`${site.siteMetadata.title} - feed`} href="/atom.xml" />
      <link rel="alternate" type="application/feed+json" title={`${site.siteMetadata.title} - feed`} href="/feed.json" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  description: "",
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
