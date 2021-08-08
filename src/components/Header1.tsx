import React from "react"

interface Props {
  children: React.ReactNode;
}

const Header1 = (props: Props): React.ReactElement => {
  return (
    <h1 className="py-4 text-4xl font-bold">
      {props.children}
    </h1>
  )
}

export default Header1
