import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Card = ({ path, title, excerpt, categories, image }) => {
    const hero = getImage(image)

    return (
        <div className="float-left w-full lg:w-1/3">
        <div className="m-4 border-2 border-gray-200 rounded-lg shadow-lg">
            <GatsbyImage image={hero} alt={title} className="w-full rounded-t-lg h-72" />
            <div className="h-72">
                <Link to={path}>
                    <h2 className="p-4 text-2xl text-gray-700">{title}</h2>
                </Link>
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
