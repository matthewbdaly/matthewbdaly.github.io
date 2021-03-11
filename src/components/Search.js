import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from 'react-use-flexsearch'

const Search = () => {
	const data = useStaticQuery(graphql`
		query {
			localSearchPosts {
				index
				store
			}
		}
	`)
	const [query, setQuery] = useState(null)
	const results = useFlexSearch(query, data.localSearchPosts.index, data.localSearchPosts.store)

	return (
		<form action="/" method="get" autoComplete="off">
			<label htmlFor="header-search">
				<span className="hidden">Search blog posts</span>
			</label>
			<input type="search" id="header-search" placeholder="Search blog posts" name="s" onChange={(e) => setQuery(e.currentTarget.value)} />
			<button type="submit">Search</button>
			<ul>
				{results.map(result => (
					<li key={result.id}>
						<Link to={result.path}>
							{result.title}
						</Link>
					</li>
				))}
			</ul>
		</form>
	)
}

export default Search
