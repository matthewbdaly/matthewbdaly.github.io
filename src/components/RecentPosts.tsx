import React, { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Card from "./Card"

const RecentPosts = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: {frontmatter: {layout: {eq: "post"}}}
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 5
        ) {
          edges {
            node {
              excerpt(pruneLength: 80)
              fields {
                path
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                categories
                featured_image {
                    childImageSharp {
                        gatsbyImageData(
                         width: 200
                        )
                    }
                }
              }
            }
          }
        }
      }
    `
  )

  return (
      <Fragment>
      <h4>Recent posts</h4>
        <div className="w-full">
      {allMdx.edges.map(({ node }) => {
        return (
            <Card key={node.fields.path} path={node.fields.path} title={node.frontmatter.title} excerpt={node.excerpt} categories={node.frontmatter.categories} image={node.frontmatter.featured_image} />
        );
      })}
      </div>
    </Fragment>
  )
}

export default RecentPosts
