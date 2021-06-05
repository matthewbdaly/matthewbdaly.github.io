import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import TextSection from "../components/TextSection"
import SEO from "../components/Seo"
import { DiscussionEmbed } from "disqus-react"
import kebabCase from "lodash/kebabCase"

const PostTemplate = ({ data, pageContext }) => {
    const post = data.mdx
    const siteTitle = data.site.siteMetadata.title
    const { previous, next } = pageContext
    const disqusConfig = {
        shortname: "matthewdaly",
        config: {
            url: data.site.siteMetadata.siteUrl + post.fields.path,
            identifier: post.fields.path,
            title: post.frontmatter.title,
            languge: 'en_GB',
        },
    }

    return (
        <Fragment>
            <SEO
                title={post.frontmatter.title}
                description={post.excerpt}
            />
            <Layout title={siteTitle}>
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

                    <DiscussionEmbed {...disqusConfig} />
                </article>
            </Layout>
        </Fragment>
    )
}

export default PostTemplate

export const postQuery = graphql`
query BlogPostByPath($path: String!) {
    site {
        siteMetadata {
            title
            siteUrl
        }
    }
    mdx(fields: { path: { eq: $path }}, frontmatter: {layout: {eq: "post"}}) {
        id
        body
        excerpt(pruneLength: 180)
        frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            categories
        }
        fields {
            path
        }
    }
}
`
