import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXProvider} from "@mdx-js/react"
import CodeBlock from "./CodeBlock"
import Paragraph from "./Paragraph"
import Anchor from "./Anchor"
import Blockquote from "./Blockquote"

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  h1: props => <h1 {...props} className="py-4 text-4xl font-bold" />,
  h2: props => <h2 {...props} className="py-4 text-2xl font-bold" />,
  h3: props => <h3 {...props} className="text-xl" />,
  li: props => <li {...props} className="list-disc" />,
  ul: props => <ul {...props} className="py-2 pl-4" />,
  p: Paragraph,
  a: Anchor,
  blockquote: Blockquote,
}

const TextSection = ({ children }): React.ReactElement => {
  return (
    <MDXProvider components={components}>
      <section>
        <MDXRenderer>{children}</MDXRenderer>
      </section>
    </MDXProvider>
  )
}

export default TextSection
