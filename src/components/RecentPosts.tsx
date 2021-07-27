import React, { Fragment } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

const RecentPosts = (): React.ReactElement => {
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
            <section key={node.fields.path} className="w-full py-2">
              <Link className="float-left w-full text-2xl font-bold" to={node.fields.path}>
                {node.frontmatter.title}
              </Link>
              <p className="float-left py-2">{node.frontmatter.date}</p>
              <p className="float-left py-2">{node.excerpt}</p>
            </section>
          )
        })}
      </div>
    </Fragment>
  )
}

export default RecentPosts
