import React from "react"

interface Props {
    children: React.ReactNode;
    title: string;
}

const Notice = (props: Props): React.ReactElement => {
    return (
        <div className="bg-red-200 b-2 p-4 my-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{props.title}</h2>
            {props.children}
        </div>
    )
}

export default Notice
