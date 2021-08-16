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
      <div className="flex flex-row flex-wrap justify-center w-full p-2 mx-auto text-center md:w-2/3 box-border">
        <Link className="w-1/3 my-2 md:w-1/5" to={"/posts/1"}>Blog</Link>
        <Link className="w-1/3 my-2 md:w-1/5" to={"/about"}>About</Link>
        <Link className="w-1/3 my-2 md:w-1/5" to={`https://twitter.com/${site.siteMetadata.social.twitter}`}>Twitter</Link>
        <Link className="w-1/3 my-2 md:w-1/5" to={`https://github.com/${site.siteMetadata.social.github}`}>Github</Link>
        <Link className="w-1/3 my-2 md:w-1/5" to={"/rss.xml"}>Feed</Link>
      </div>
      <div className="w-full p-4 mx-auto text-center md:w-2/3">
        <p>&copy; Matthew Daly {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
