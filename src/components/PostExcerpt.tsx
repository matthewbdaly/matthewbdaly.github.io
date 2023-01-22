import React from "react"
import { Link } from "gatsby"

interface Props {
    path: string;
    date: string;
    excerpt: string;
    title: string;
}

const PostExcerpt = (props: Props): React.ReactElement => (
  <article className="w-full py-2 h-entry">
    <Link className="float-left w-full u-url" to={props.path}>
      <h2 className="text-2xl font-bold e-content p-name">{props.title}</h2>
    </Link>
    <p className="float-left py-2 dt-published">{props.date}</p>
    <p className="float-left py-2 p-summary">{props.excerpt}</p>
  </article>
)

export default PostExcerpt
