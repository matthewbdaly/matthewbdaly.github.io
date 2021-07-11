import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

interface Props {
  category: string;
}

const Tag = (props: Props): React.ReactElement => (
  <Link to={`/blog/categories/${kebabCase(props.category)}/`}>
    <span className="inline-block px-4 py-2 my-2 mr-2 text-sm font-bold text-gray-900 bg-purple-200 rounded-full hover:bg-purple-800 hover:text-gray-200 transition-colors duration-500">
      {props.category}
    </span>
  </Link>
)

export default Tag
