import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import AmpLayout from "../components/AmpLayout"
import SEO from "../components/Seo"
import TextSection from "../components/TextSection"
import kebabCase from "lodash/kebabCase"

const AmpPostTemplate = ({ data, pageContext }) => {
    const post = data.mdx
    const siteTitle = data.site.siteMetadata.title
    const { previous, next } = pageContext

    return (
        <Fragment>
            <SEO
                title={post.frontmatter.title}
                description={post.excerpt}
            />
            <AmpLayout title={siteTitle}>
                <article>
                    <header>
                        <h2 className="my-8 font-serif text-4xl font-extrabold">
                            {post.frontmatter.title}
                        </h2>
                        <p className="my-4 font-serif text-lg font-semibold">{post.frontmatter.date}</p>
                    </header>
                    <TextSection>{post.body}</TextSection>
                    <hr />
                    <div className="py-4">
                        {post.frontmatter.categories && post.frontmatter.categories.map((category: string) => (
                            <Link className="px-4 py-2 mx-2 text-sm font-bold text-gray-900 bg-gray-100 rounded-full hover:bg-gray-200"
                                to={`/categories/${kebabCase(category)}/`}
                                key={category}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </article>

                <nav className="p-4">
                    <ul>
                        <li className="float-left">
                            {previous && (
                                <Link to={previous.fields.path} rel="prev">
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li className="float-right">
                            {next && (
                                <Link to={next.fields.path} rel="next">
                                    {next.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </AmpLayout>
        </Fragment>
    )
}

export default AmpPostTemplate

export const ampPostQuery = graphql`
query AmpBlogPostByPath($amppath: String!) {
    site {
        siteMetadata {
            title
            siteUrl
        }
    }
    mdx(fields: { amppath: { eq: $amppath }}, frontmatter: {layout: {eq: "post"}}) {
        id
        body
        excerpt(pruneLength: 160)
        frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            categories
        }
        fields {
            path
            amppath
        }
    }
}
`
