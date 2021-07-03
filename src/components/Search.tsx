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
				publicIndexURL
				publicStoreURL
			}
		}
	`)
	const [query, setQuery] = useState(null)
	const results = useFlexSearch(query, fetch(data.localSearchPosts.index), fetch(data.localSearchPosts.store))

    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length > 2) {
			setQuery(e.currentTarget.value)
		} else {
			setQuery(null)
		}
	}

	return (
		<form action="/search" method="get" autoComplete="off" className="float-none pr-4 my-4 md:float-right md:p-4 md:my-0" target="_top">
			<label htmlFor="header-search">
				<span className="hidden">Search blog posts</span>
			</label>
			<div className="relative w-full md:float-right">
				<input type="search" id="header-search" placeholder="Search blog posts" name="s" onChange={updateSearch} className="float-left w-3/4 p-4 text-xl text-gray-900 border-2 border-gray-100 md:float-none" />
				<button type="submit" className="float-right w-1/4 px-2 py-4 mx-0 md:float-none">Search</button>
				<ul className="absolute w-full shadow md:w-3/4 md:clear-left top-24 md:top-16">
									{results.slice(0, 5).map((result: Result) => (
						<Link to={result.path} key={result.id}>
							<li className="z-10 p-2 text-gray-900 bg-white border-2 border-gray-200 dark:bg-gray-800 dark:text-white">
								{result.title}
								</li>
						</Link>
					))}
				</ul>
			</div>
		</form>
	)
}

export default Search
