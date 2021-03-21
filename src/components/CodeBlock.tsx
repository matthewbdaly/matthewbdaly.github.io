import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {mdx} from '@mdx-js/react'
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import './CodeBlock.css'

(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-django");
require("prismjs/components/prism-flow");
require("prismjs/components/prism-gherkin");
require("prismjs/components/prism-handlebars");
require("prismjs/components/prism-nginx");
require("prismjs/components/prism-perl");
require("prismjs/components/prism-php");
require("prismjs/components/prism-pug");
require("prismjs/components/prism-ruby");
require("prismjs/components/prism-twig");
require("prismjs/components/prism-vim");

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map(v => v.split(`-`).map(x => parseInt(x, 10)))
    return (index: number) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

const CodeBlock = ({children, className, live, metastring}) => {
  const language = className ? className.replace(/language-/, '') : null

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        transformCode={code => '/** @jsx mdx */' + code}
        scope={{ mdx }}
        theme={oceanicNext}
      >
        <div style={{marginTop: '40px', backgroundColor: 'white'}}>
          <LivePreview />
        </div>
        <div style={{marginTop: '40px', backgroundColor: 'black'}}>
          <LiveEditor />
        </div>
        <LiveError />
      </LiveProvider>
    )
  }

  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Highlight Prism={Prism} {...defaultProps} code={children} language={language} theme={oceanicNext}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <div className="gatsby-highlight" data-language={language}>
            <pre className={className} style={{...style, padding: '20px', width: '100%', overflow: 'auto'}}>
            {tokens.filter((line, i, arr) => {
              if (i < (arr.length - 1)) {
                return true
              }
              if (line.length > 1) {
                return true
              }
              return !line[0].empty
            }).map((line, i) => {
              const lineProps = getLineProps({ line, key: i })

              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`
              }

              return (
                <div key={i} {...lineProps}>
                  <span className="line-number-style">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token, key})} />
                  ))}
                </div>
              )})}
          </pre>
        </div>
      )}
    </Highlight>
  )
}

export default CodeBlock
