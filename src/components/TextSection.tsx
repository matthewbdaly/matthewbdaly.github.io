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
import Header1 from "./Header1"
import Header2 from "./Header2"
import Header3 from "./Header3"
import ContactForm from "./ContactForm"

const components = {
  pre: Pre,
  code: CodeBlock,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  li: ListItem,
  ul: UnorderedList,
  p: Paragraph,
  a: Anchor,
  blockquote: Blockquote,
  ContactForm
}

interface Props {
    children: string & React.ReactNode;
}

const TextSection = (props: Props): React.ReactElement => {
  return (
    <MDXProvider components={components}>
      <section>
        <MDXRenderer>{props.children}</MDXRenderer>
      </section>
    </MDXProvider>
  )
}

export default TextSection
