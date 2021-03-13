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

	const updateSearch = (e) => {
		if (e.currentTarget.value.length > 2) {
			setQuery(e.currentTarget.value)
		} else {
			setQuery(null)
		}
	}

	return (
		<form action="/" method="get" autoComplete="off" className="p-4">
			<label htmlFor="header-search">
				<span className="hidden">Search blog posts</span>
			</label>
			<input type="search" id="header-search" placeholder="Search blog posts" name="s" onChange={updateSearch} />
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
