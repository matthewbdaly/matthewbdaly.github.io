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
		<form action="/" method="get" autoComplete="off" className="float-right p-4">
			<label htmlFor="header-search">
				<span className="hidden">Search blog posts</span>
			</label>
			<input type="search" id="header-search" placeholder="Search blog posts" name="s" onChange={updateSearch} className="p-4 text-xl border-2 border-gray-100" />
			<button type="submit">Search</button>
			<ul className="absolute shadow">
                {results.slice(0, 5).map((result: Result) => (
					<Link to={result.path} key={result.id}>
					    <li className="relative z-10 bg-white border-2 border-gray-200">
							{result.title}
					    </li>
					</Link>
				))}
			</ul>
		</form>
	)
}

export default Search
