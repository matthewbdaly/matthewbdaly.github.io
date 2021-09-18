import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Tag from "../components/Tag"
import { SiteData } from "../Types"

interface Category {
    totalCount: number;
    category: string;
}

interface Props {
  site: SiteData;
  data: {
    allMdx: {
      group: Category[];
    }
  }
  location: Location;
}

const Categories = ({ location, data: {
  allMdx: { group },
  site: {
    siteMetadata: { title, siteUrl },
  }
}}: Props): React.ReactElement => {
  const canonicalUrl = siteUrl + location.pathname

  return (
    <Layout title={title} siteUrl={siteUrl}>
      <SEO
        title={"Categories"}
        description={"Categories"}
        url={canonicalUrl}
      />
      <div className="p-4">
        {group.map((node: Category) => <Tag key={node.category} category={node.category} />)}
      </div>
    </Layout>
  )
}

export default Categories

export const categoriesQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMdx {
      group(field: frontmatter___categories) {
        category: fieldValue
        totalCount
      }
    }
  }
`
