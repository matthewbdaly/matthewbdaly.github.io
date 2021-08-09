import React from "react"
import { Link } from "gatsby"

interface Props {
  path: string;
  title: string;
}

const NextPage = (props: Props): React.ReactElement => (
  <Link to={props.path} rel="next" className="p-2 border-2 rounded shadow-sm">
    <p><strong>→ Next page</strong></p>
    <p className="pl-6">{props.title}</p>
  </Link>
)

export default NextPage
