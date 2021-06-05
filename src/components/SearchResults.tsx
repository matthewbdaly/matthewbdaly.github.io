import React, { ChangeEvent, Fragment, useState } from "react"
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
      <Fragment>
          {results.slice(0, 5).map((result: Result) => (
              <Link to={result.path} key={result.id}>
                  <li className="z-10 p-2 text-gray-900 bg-white border-2 border-gray-200 dark:bg-gray-800 dark:text-white">
                      {result.title}
                  </li>
              </Link>
          ))}
      </Fragment>
  )
}

export default SearchResults
