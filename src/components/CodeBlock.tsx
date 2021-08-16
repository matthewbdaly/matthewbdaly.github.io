import React, { Fragment } from "react"
import Highlight, {defaultProps} from "prism-react-renderer"
import Prism from "prism-react-renderer/prism"
import {LiveProvider, LiveEditor, LiveError, LivePreview} from "react-live"
import { mdx } from "@mdx-js/react"
import oceanicNext from "prism-react-renderer/themes/oceanicNext"
import "./CodeBlock.css"

(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-django")
require("prismjs/components/prism-flow")
require("prismjs/components/prism-gherkin")
require("prismjs/components/prism-handlebars")
require("prismjs/components/prism-nginx")
require("prismjs/components/prism-perl")
require("prismjs/components/prism-php")
require("prismjs/components/prism-pug")
require("prismjs/components/prism-ruby")
require("prismjs/components/prism-twig")
require("prismjs/components/prism-vim")

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(",")
    .map(v => v.split("-").map(x => parseInt(x, 10)))
  return (index: number) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

interface Props {
    children: string;
    className: string;
    live: boolean;
    metastring: string;
    title: string;
}

const CodeBlock = ({children, className, live, metastring, title}: Props): React.ReactElement => {
  const language = className ? className.replace(/language-/, "") : null

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        transformCode={code => "/** @jsx mdx */" + code}
        scope={{ mdx }}
        theme={oceanicNext}
      >
        <div className="p-4 text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100" style={{marginTop: "40px"}}>
          <LivePreview />
        </div>
        {title && <span className="block w-full p-2 px-8 m-0 mt-2 -mb-8 overflow-x-auto font-mono text-sm text-gray-800 bg-gray-300 border-gray-800 rounded-t-lg shadow-lg bg-gradient-to-b from-gray-200 to-gray-300">{title}</span>}
        <div style={{marginTop: "2rem", backgroundColor: "black"}}>
          <LiveEditor />
        </div>
        <LiveError className="p-4 mt-2 overflow-x-scroll text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100" />
      </LiveProvider>
    )
  }

  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Fragment>
      {title && <span className="block w-full p-2 px-8 m-0 mt-2 -mb-4 overflow-x-auto font-mono text-sm text-gray-800 bg-gray-300 border-gray-800 rounded-t-lg shadow-lg bg-gradient-to-b from-gray-200 to-gray-300">{title}</span>}
      <Highlight Prism={Prism} {...defaultProps} code={children} language={language} theme={oceanicNext}>
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <div className="gatsby-highlight" data-language={language}>
            <pre className={`${className}${title && " title"}`} style={{...style}}>
              {tokens.filter((line, i, arr) => {
                if (i < (arr.length - 1)) {
                  return true
                }
                if (line.length > 1) {
                  return true
                }
                return !line[0].empty
              }).map((line, i, arr) => {
                const lineProps = getLineProps({ line, key: i })

                if (shouldHighlightLine(i)) {
                  lineProps.className = `${lineProps.className} highlight-line`
                }

                return (
                  <div key={i} {...lineProps}>
                    <span className="line-number-style">{arr.length > 1 ? i + 1 : ""}</span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({token, key})} />
                    ))}
                  </div>
                )})}
            </pre>
          </div>
        )}
      </Highlight>
    </Fragment>
  )
}

export default CodeBlock
