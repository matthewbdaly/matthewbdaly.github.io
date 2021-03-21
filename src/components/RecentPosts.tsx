import React, { Fragment } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

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
              excerpt
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
      <h4>Recent posts</h4>
      {allMdx.edges.map(({ node }) => {
        return (
          <Link to={node.fields.path} key={node.fields.path}>
            {node.frontmatter.title}
          </Link>
        );
      })}
    </Fragment>
  )
}

export default RecentPosts
