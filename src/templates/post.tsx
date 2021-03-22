import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import TextSection from "../components/TextSection"
import SEO from "../components/Seo"
import { DiscussionEmbed } from "disqus-react"
import kebabCase from "lodash/kebabCase"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PostTemplate = ({ data, pageContext }) => {
    const post = data.mdx
    const hero = getImage(post.frontmatter.featured_image)
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
        <Layout title={siteTitle}>
            <GatsbyImage image={hero} alt={post.frontmatter.title} className="w-full" />
            <SEO
                title={post.frontmatter.title}
                description={post.excerpt}
            />
            <article>
                <header>
                    <h2 className="text-2xl">
                        {post.frontmatter.title}
                    </h2>
                    <p
                    >
                        {post.frontmatter.date}
                    </p>
                </header>
                <TextSection>{post.body}</TextSection>
                <hr />
                <div className="py-4">
                    {post.frontmatter.categories && post.frontmatter.categories.map((category: string) => (
                        <Link className="p-2 mr-4 text-xl text-white bg-green-600 rounded-md"
                            to={`/categories/${kebabCase(category)}/`}
                            key={category}
                        >
                            {category}
                        </Link>
                    ))}
                </div>
                <DiscussionEmbed {...disqusConfig} />
                <footer>
                </footer>
            </article>

            <nav>
                <ul
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.path} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.path} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
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
        excerpt(pruneLength: 160)
        frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            categories
            featured_image {
                childImageSharp {
                    gatsbyImageData(
                     width: 800
                    )
                }
            }

        }
        fields {
            path
        }
    }
}
`
