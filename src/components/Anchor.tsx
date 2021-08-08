import React from "react"

interface Props {
  children: React.ReactNode;
  href: string;
}

const Anchor = (props: Props): React.ReactElement => {
  return (
    <a href={props.href} className="border-b-2 border-green-400">
      {props.children}
    </a>
  )
}

export default Anchor
