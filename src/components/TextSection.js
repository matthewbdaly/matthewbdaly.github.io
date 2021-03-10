import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import CodeBlock from "./CodeBlock"

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}

const TextSection = ({ children }) => {
  return (
    <section>
      <MDXRenderer components={components}>{children}</MDXRenderer>
    </section>
  )
}

export default TextSection
