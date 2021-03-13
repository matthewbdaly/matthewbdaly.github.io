import React from "react"
import { Link } from "gatsby"
import Search from "./Search"

const Layout = ({ title, children }) => {
    const header = (
        <>
            <h1 className="text-4xl float-left">
                <Link to={`/`}>
                    {title}
                </Link>
            </h1>
            <Search />
        </>
    )

    return (
        <div className="container p-4 mx-auto">
            <header>{header}</header>
            <div className="clear-both" />
            <main>{children}</main>
            <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
        </div>
    )
}

export default Layout
