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
              excerpt(pruneLength: 180)
              fields {
                path
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
              }
            }
          }
        }
      }
    `
  )

  return (
      <Fragment>
      <h2 className="text-2xl">Recent posts</h2>
        <div className="w-full">
      {allMdx.edges.map(({ node }) => {
        return (
            <Card 
              key={node.fields.path} 
              path={node.fields.path} 
              title={node.frontmatter.title} 
              excerpt={node.excerpt} 
            />
        );
      })}
      </div>
    </Fragment>
  )
}

export default RecentPosts
