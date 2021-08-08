import React, { ChangeEvent, useState } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { Link, useStaticQuery, graphql } from "gatsby"

interface Result {
    id: string;
    path: string;
    title: string;
}

interface Props {
    value: string;
}

const SearchResults = ({ value }: Props): React.ReactElement => {
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
      <div className="w-full">
        <input type="search" id="search" placeholder="Search blog posts" name="s" onChange={updateSearch} className="float-left w-3/4 p-4 text-xl text-gray-900 border-2 border-gray-100 md:float-none" defaultValue={value} />
        <button type="submit" className="float-right w-1/4 px-2 py-4 mx-0 border-2 md:float-none">Search</button>
        <div className="w-full divide-y divide-gray-800 dark:divide-gray-200 mt-2">
          {results.map((result: Result) => (
            <Link key={result.id} className="float-left w-full py-4 text-xl font-bold focus:outline-none focus:ring focus:border-blue-300" to={result.path}>
              <span key={result.id} className="block w-full px-2">
                {result.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </form>
  )
}

export default SearchResults
