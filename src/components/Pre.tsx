import React from "react"

interface Props {
    children: React.ReactNode;
}

const Pre = (props: Props): React.ReactElement => {
  return (
    <pre>
      {props.children}
    </pre>
  )
}

export default Pre
