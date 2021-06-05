import React, { ChangeEvent, useState } from "react"
import { useFlexSearch } from 'react-use-flexsearch'
import { Link, useStaticQuery, graphql } from "gatsby"

type Result = {
    id: string,
    path: string,
    title: string
}

const SearchResults = ({ value }) => {
	const data = useStaticQuery(graphql`
		query {
			localSearchPosts {
				index
				store
			}
		}
	`)
	const [query, setQuery] = useState(value)
	const results = useFlexSearch(query, data.localSearchPosts.index, data.localSearchPosts.store)

    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length > 2) {
			setQuery(e.currentTarget.value)
		} else {
			setQuery(null)
		}
	}

  return (
		<form action="/search" method="get" autoComplete="off" target="_top">
			<label htmlFor="search">
				<span className="hidden">Search blog posts</span>
			</label>
			<div className="w-full">
				<input type="search" id="search" placeholder="Search blog posts" name="s" onChange={updateSearch} className="float-left w-3/4 p-4 text-xl text-gray-900 border-2 border-gray-100 md:float-none" defaultValue={value} />
				<button type="submit" className="float-right w-1/4 px-2 py-4 mx-0 border-2 md:float-none">Search</button>
				<ul className="w-full shadow">
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

export default SearchResults
