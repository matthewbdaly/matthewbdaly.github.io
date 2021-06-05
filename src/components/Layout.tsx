import React from "react"
import { Link } from "gatsby"
import Search from "./Search"

const Layout = ({ title, children }) => {
    return (
        <div className="font-sans text-lg font-normal text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-200">
            <div className="w-full text-gray-200 bg-blue-800 shadow-lg h-36">
                <div className="container p-4 mx-auto">
                    <header>
                        <h1 className="float-left font-serif text-4xl">
                            <Link to={`/`}>{title}</Link>
                        </h1>
                        <Search />
                    </header>
                </div>
            </div>
            <div className="clear-both" />
            <div className="container p-4 mx-auto">
                <main>{children}</main>
            </div>
            <footer className="w-full h-24 p-4 text-center text-gray-200 align-middle bg-gray-900 clear-both">
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
        </div>
    )
}

export default Layout
