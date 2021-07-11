import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXProvider} from "@mdx-js/react"
import CodeBlock from "./CodeBlock"

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  h1: props => <h1 {...props} className="py-4 text-4xl font-bold" />,
  h2: props => <h2 {...props} className="py-4 text-2xl font-bold" />,
  h3: props => <h3 {...props} className="text-xl" />,
  li: props => <li {...props} className="list-disc" />,
  ul: props => <ul {...props} className="py-2 pl-4" />,
  p: props => <p {...props} className="py-2" />,
  blockquote: props => <blockquote {...props} className="pl-4 italic text-gray-200 text-gray-900 bg-gray-100 border-l-8 border-gray-500 dark:text-gray-300 dark:bg-gray-800" />,
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
