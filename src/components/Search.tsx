import React, { ChangeEvent, useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from 'react-use-flexsearch'

type Result = {
    id: string,
    path: string,
    title: string
}

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

    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
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
                {results.map((result: Result) => (
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