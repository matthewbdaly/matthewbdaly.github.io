import React from "react"
import { Link } from "gatsby"

interface Props {
    path: string;
    title: string;
}

const PreviousPage = (props: Props): React.ReactElement => (
  <Link to={props.path} rel="prev">
        ← {props.title}
  </Link>
)

export default PreviousPage