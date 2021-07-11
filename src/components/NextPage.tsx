import React from "react"
import { Link } from "gatsby"

interface Props {
    path: string;
    title: string;
}

const NextPage = (props: Props): React.ReactElement => (
  <Link to={props.path} rel="next">
    {props.title} →
  </Link>
)

export default NextPage