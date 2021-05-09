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
			<button type="submit" className="px-2 py-4 mx-0 border-2">Search</button>
			<ul className="absolute shadow">
                {results.slice(0, 5).map((result: Result) => (
					<Link to={result.path} key={result.id}>
						<li className="relative z-10 p-2 text-gray-900 bg-white border-2 border-gray-200 dark:bg-gray-800 dark:text-white">
							{result.title}
					    </li>
					</Link>
				))}
			</ul>
		</form>
	)
}

export default Search
