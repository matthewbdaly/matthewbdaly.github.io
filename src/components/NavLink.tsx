import React from "react"
import { Link } from "gatsby"

interface Props {
  to: string;
  text: string;
}

const NavLink = (props: Props): React.ReactElement => (
  <li className="inline-block pr py-2 mr-8 lg:mt-4 text-sm text-gray-900 dark:text-gray-200 border-b-4 border-transparent hover:border-green-400 transition-colors duration-500">
    <Link to={props.to}>
      {props.text}
    </Link>
  </li>
)

export default NavLink
