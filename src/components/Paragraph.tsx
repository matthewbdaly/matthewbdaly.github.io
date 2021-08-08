import React from "react"

interface Props {
  children: React.ReactNode;
}

const Paragraph = (props: Props): React.ReactElement => {
  return (
    <p className="py-2">
      {props.children}
    </p>
  )
}

export default Paragraph
