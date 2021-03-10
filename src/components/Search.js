import React, { useState } from "react"
import { useFlexSearch } from 'react-use-flexsearch'

const Search = () => {
	const [query, setQuery] = useState(null)
	const results = useFlexSearch(query, index, store)

	return (
		<div>
		</div>
	)
}

export default Layout
