import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

const Footer = (): React.ReactElement => {
  const { site } = useStaticQuery(
    graphql`
          query {
            site {
              siteMetadata {
                social {
                  twitter
                  github
                }
              }
            }
          }
        `
  )
  return (
    <footer className="w-full p-4 text-gray-100 bg-gray-800">
      <div className="w-full md:w-2/3 p-2 mx-auto text-center flex flex-col md:flex-row flex-wrap justify-center">
        <Link className="my-2 mx-8" to={"/posts/1"}>Blog</Link>
        <Link className="my-2 mx-8" to={"/about"}>About</Link>
        <Link className="my-2 mx-8" to={`https://twitter.com/${site.siteMetadata.social.twitter}`}>Twitter</Link>
        <Link className="my-2 mx-8" to={`https://github.com/${site.siteMetadata.social.github}`}>Github</Link>
        <Link className="my-2 mx-8" to={"/rss.xml"}>Feed</Link>
      </div>
      <div className="w-full p-4 mx-auto text-center md:w-2/3">
        <p>&copy; Matthew Daly {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
