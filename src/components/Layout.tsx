import React from "react"
import { Link } from "gatsby"
import Search from "./Search"

const Layout = ({ title, children }) => {
	const header = (
		<h1 className="text-4xl">
			<Link to={`/`}>
				{title}
			</Link>
			<Search />
		</h1>
	)

	return (
		<div className="container px-4 mx-auto">
			<header>{header}</header>
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
