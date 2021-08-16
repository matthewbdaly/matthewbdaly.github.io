import React from "react"
import { Link } from "gatsby"

interface Props {
  path: string;
  title: string;
}

const NextPage = (props: Props): React.ReactElement => (
  <Link to={props.path} rel="next" className="float-right w-1/2 p-2 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 ease-in-out">
    <p><strong>→ Next page</strong></p>
    <p className="pl-6">{props.title}</p>
  </Link>
)

export default NextPage
