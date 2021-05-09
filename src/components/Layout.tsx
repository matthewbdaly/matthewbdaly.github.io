import React from "react"
import { Link } from "gatsby"
import Search from "./Search"

const Layout = ({ title, children }) => {
    return (
        <div className="font-sans text-lg font-normal text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-200">
            <div className="container p-4 mx-auto">
                <header>
                    <h1 className="float-left text-4xl">
                        <Link to={`/`}>{title}</Link>
                    </h1>
                    <Search />
                </header>
                <div className="clear-both" />
                <main>{children}</main>
            </div>
            <footer className="w-full text-white bg-blue-900 clear-both h-72">
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
        </div>
    )
}

export default Layout
