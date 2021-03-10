import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXProvider} from '@mdx-js/react'
import CodeBlock from "./CodeBlock"

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}

const TextSection = ({ children }) => {
  return (
    <MDXProvider components={components}>
      <section>
        <MDXRenderer>{children}</MDXRenderer>
      </section>
    </MDXProvider>
  )
}

export default TextSection
