import React from "react"
import { Link } from "gatsby"

interface Props {
    path: string;
    date: string;
    excerpt: string;
    title: string;
}

const PostExcerpt = (props: Props): React.ReactElement => (
  <section className="w-full py-2">
    <Link className="float-left w-full text-2xl font-bold" to={props.path}>
      {props.title}
    </Link>
    <p className="float-left py-2">{props.date}</p>
    <p className="float-left py-2">{props.excerpt}</p>
  </section>
)

export default PostExcerpt
