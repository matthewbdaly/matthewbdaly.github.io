import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Card = ({ title, excerpt, categories }) => {
    return (
        <div className="float-left w-full lg:w-1/3">
        <div className="m-4 border-2 border-gray-200 rounded-lg shadow-lg">
          <img src="https://placekitten.com/300/200" className="w-full rounded-t-lg h-72"/>
            <div className="h-72">
                <h2 className="p-4 text-2xl text-gray-700">{title}</h2>
                <p className="p-4 text-gray-500">{excerpt}</p>
                    {categories.map((category: string) => (
                      <Link to={`/categories/${kebabCase(category)}/`} key={category}>
                        <span className="p-2 mx-2 text-white bg-green-600 rounded-md">
                          {category}
                        </span>
                      </Link>
                    ))}
            </div>
          </div>
        </div>
    )
}

export default Card
