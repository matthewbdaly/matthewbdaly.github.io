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
      <ul className="flex flex-row flex-wrap justify-center w-full p-2 mx-auto text-center md:w-2/3 box-border">
        <li className="w-1/3 my-2 md:w-1/6">
          <Link to={"/posts/1"}>Blog</Link>
        </li>
        <li className="w-1/3 my-2 md:w-1/6">
          <Link to={"/about"}>About</Link>
        </li>
        <li className="w-1/3 my-2 md:w-1/6">
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li className="w-1/3 my-2 md:w-1/6">
          <a href={`https://github.com/${site.siteMetadata.social.github}`}>Github</a>
        </li>
        <li className="w-1/3 my-2 md:w-1/6">
          <a href={"/rss.xml"}>Feed</a>
        </li>
      </ul>
      <div className="w-full p-4 mx-auto text-center md:w-2/3">
        <p>&copy; Matthew Daly {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
