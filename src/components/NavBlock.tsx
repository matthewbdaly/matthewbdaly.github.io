import React from "react"
import NextPage from "./NextPage"
import PreviousPage from "./PreviousPage"

interface Props {
    previous?: {
        path: string;
        title: string;
    };
    next?: {
        path: string;
        title: string;
    };
}

const NavBlock = (props: Props): React.ReactElement => (
  <nav className="pt-4 clear-both grid grid-flow-row grid-cols-2 grid-rows-1 gap-4">
    {props.previous && <PreviousPage path={props.previous.path} title={props.previous.title} />}
    {props.next && <NextPage path={props.next.path} title={props.next.title} />}
  </nav>
)

export default NavBlock
