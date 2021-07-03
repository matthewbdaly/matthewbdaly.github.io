import React from "react"
import { Link } from "gatsby"
import NavLink from "./NavLink"

const Layout = ({ title, children }) => {
    return (
    <div className="min-h-screen font-sans text-lg text-gray-800 bg-gray-200 dark:text-gray-100 dark:bg-gray-700 leading-6">
      <div className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      </div>
      <nav className="w-full p-4 mx-auto md:w-2/3">
        <h1 className="block float-left py-4 text-4xl font-bold">
          <Link to={`/`}>{title}</Link>
        </h1>
        <div className="float-right py-2">
          <NavLink to={`/blog/archives`} text="Archives" />
          <NavLink to={`/about`} text="About" />
          <NavLink to={`/uses`} text="Uses" />
          <NavLink to={`/posts/1`} text="Blog" />
          <NavLink to={`/search`} text="Search" />
        </div>
      </nav>

      <div className="clear h-4" />

      <main className="w-full p-4 mx-auto md:w-2/3">
        {children}
      </main>

      <footer className="w-full p-4 text-gray-100 bg-gray-800">
        <div className="w-full p-4 mx-auto text-center md:w-2/3">
          <p>&copy; Matthew Daly {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
    )
}

export default Layout
