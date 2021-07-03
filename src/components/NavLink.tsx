import React from "react"
import { Link } from "gatsby"

type Props = {
  to: string,
  text: string
}

const NavLink = (props: Props): React.ReactElement => (
    <Link to={props.to}>
      <span className="inline-block px-4 py-2 m-2 text-lg text-gray-900 rounded-full dark:text-gray-200 hover:bg-purple-800 hover:text-gray-200 transition-colors duration-500">
        {props.text}
      </span>
    </Link>
)

export default NavLink
