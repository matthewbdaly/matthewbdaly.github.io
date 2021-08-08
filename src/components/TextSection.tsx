import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {MDXProvider} from "@mdx-js/react"
import CodeBlock from "./CodeBlock"
import Paragraph from "./Paragraph"
import Anchor from "./Anchor"
import Blockquote from "./Blockquote"
import ListItem from "./ListItem"
import UnorderedList from "./UnorderedList"
import Pre from "./Pre"

const components = {
  pre: Pre,
  code: CodeBlock,
  h1: props => <h1 {...props} className="py-4 text-4xl font-bold" />,
  h2: props => <h2 {...props} className="py-4 text-2xl font-bold" />,
  h3: props => <h3 {...props} className="text-xl" />,
  li: ListItem,
  ul: UnorderedList,
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
