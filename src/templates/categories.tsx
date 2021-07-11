import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Tag from "../components/Tag"

interface Category {
    totalCount: number;
    category: string;
}

const Categories = ({ data: {
  allMdx: { group },
  site: {
    siteMetadata: { title },
  }
}}): React.ReactElement => {

  return (
    <Layout title={title}>
      <SEO
        title={"Categories"}
        description={"Categories"}
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
