import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {mdx} from '@mdx-js/react'
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

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

const CodeBlock = ({children, className, live}) => {
  const language = className ? className.replace(/language-/, '') : null

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        transformCode={code => '/** @jsx mdx */' + code}
        scope={{ mdx }}
        theme={oceanicNext}
        _    >
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

  return (
    <Highlight Prism={Prism} {...defaultProps} code={children} language={language} theme={oceanicNext}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
