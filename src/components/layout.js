import React from "react"
import { Link } from "gatsby"
import Search from "./Search"

const Layout = ({ location, title, children }) => {
	const header = (
		<h3>
			<Link to={`/`}>
				{title}
			</Link>
			<Search />
		</h3>
	)

	return (
		<div>
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
