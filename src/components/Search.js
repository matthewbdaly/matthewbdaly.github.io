import React, { useState } from "react"
import { useFlexSearch } from 'react-use-flexsearch'

const posts = [
	{ id: '1', name: 'This first post is about React' },
	{ id: '2', name: 'This next post is about Preact' },
	{ id: '3', name: 'We have yet another React post!' },
	{ id: '4', name: 'This is the fourth and final post' },
];

const Search = () => {
	// const [query, setQuery] = useState(null)
	// const results = useFlexSearch(query, index, store)

	return (
		<form action="/" method="get">
			<label htmlFor="header-search">
				<span className="hidden">Search blog posts</span>
			</label>
			<input type="search" id="header-search" placeholder="Search blog posts" name="s" />
			<button type="submit">Search</button>
			<ul>
				{posts.map(post => {
					<li key={post.id}>post.name</li>
				})}
			</ul>
		</form>
	)
}

export default Search
