import React from "react"
import { Link } from "gatsby"

interface Props {
  path: string;
  title: string;
}

const PreviousPage = (props: Props): React.ReactElement => (
  <Link to={props.path} rel="prev" className="p-2 border-2 rounded shadow-sm">
    <p><strong className="font-bold clear-both">← Previous page</strong></p>
    <p className="pl-6">{props.title}</p>
  </Link>
)

export default PreviousPage
