import React from "react"

interface Props {
  children: React.ReactNode;
}

const Blockquote = (props: Props): React.ReactElement => {
  return (
    <blockquote className="pl-4 italic text-gray-200 text-gray-900 bg-gray-100 border-l-8 border-gray-500 dark:text-gray-300 dark:bg-gray-800">
      {props.children}
    </blockquote>
  )
}

export default Blockquote
