import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Card = ({ path, title, excerpt }) => {
    return (
        <div className="float-left w-full lg:w-1/3">
            <div className="m-4 ml-0 border-2 border-gray-200 rounded-lg shadow-lg dark:border-gray-600">
            <div>
                <div className="h-24 md:h-16">
                <Link to={path}>
                    <h2 className="p-4 font-serif text-2xl font-medium text-gray-700 dark:text-gray-200">{title}</h2>
                </Link>
                </div>
                <div className="h-48 py-4 md:h-36">
                    <p className="p-4 text-gray-500 dark:text-gray-300">{excerpt}</p>
                </div>
            </div>
          </div>
        </div>
    )
}

export default Card
