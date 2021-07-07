import React from "react"
import { Link } from "gatsby"

interface Props {
  to: string;
  text: string;
}

const NavLink = (props: Props): React.ReactElement => (
    <Link to={props.to}>
      <span className="inline-block pr-4 py-2 mr-4 lg:mt-4 text-sm text-gray-900 dark:text-gray-200 border-b-4 border-transparent hover:border-green-400 transition-colors duration-500">
        {props.text}
      </span>
    </Link>
)

export default NavLink
