import React from "react"

interface Props {
    children: React.ReactNode;
}

const Header3 = (props: Props): React.ReactElement => {
  return (
    <h3 className="text-xl">
      {props.children}
    </h3>
  )
}

export default Header3
