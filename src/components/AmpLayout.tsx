import React from "react"
import { Link } from "gatsby"

const AmpLayout = ({ location, title, children }) => {
	const header = (
		<h3>
			<Link to={`/`}>
				{title}
			</Link>
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

export default AmpLayout
