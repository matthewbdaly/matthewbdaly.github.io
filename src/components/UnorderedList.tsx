import React from "react"

interface Props {
    children: React.ReactNode;
}

const UnorderedList = (props: Props): React.ReactElement => {
  return (
    <ul className="py-2 pl-4">
      {props.children}
    </ul>
  )
}

export default UnorderedList
