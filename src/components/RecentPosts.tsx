import React, { Fragment } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import PostExcerpt from "./PostExcerpt"

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
      <section className="mt-16">
        <h2 className="text-2xl">Recent posts</h2>
        <div className="w-full">
          {allMdx.edges.map(({ node }) => (
            <PostExcerpt key={node.fields.path} path={node.fields.path} title={node.frontmatter.title} date={node.frontmatter.date} excerpt={node.excerpt} />
          ))}
        </div>
      </section>
      <section className="clear-both">
        <Link to="/posts/1">Read more posts...</Link>
      </section>
    </Fragment>
  )
}

export default RecentPosts
