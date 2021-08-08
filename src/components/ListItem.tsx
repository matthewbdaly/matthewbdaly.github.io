import React from "react"

interface Props {
    children: React.ReactNode;
}

const ListItem = (props: Props): React.ReactElement => {
  return (
    <li className="list-disc">
      {props.children}
    </li>
  )
}

export default ListItem
