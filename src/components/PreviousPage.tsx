import React from "react"
import { Link } from "gatsby"

interface Props {
  path: string;
  title: string;
}

const PreviousPage = (props: Props): React.ReactElement => (
  <Link to={props.path} rel="prev" className="float-left w-1/2 p-2 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 ease-in-out">
    <p><strong className="font-bold clear-both">← Previous page</strong></p>
    <p className="pl-6">{props.title}</p>
  </Link>
)

export default PreviousPage
