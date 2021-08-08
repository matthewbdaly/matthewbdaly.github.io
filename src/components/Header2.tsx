import React from "react"

interface Props {
    children: React.ReactNode;
}

const Header2 = (props: Props): React.ReactElement => {
  return (
    <h2 className="py-4 text-2xl font-bold">,
      {props.children}
    </h2>
  )
}

export default Header2
