import React from "react"
import { Link } from "gatsby"

const Layout = ({ title, children }) => {
    return (
    <div className="min-h-screen font-sans text-lg text-gray-800 bg-gray-200 dark:text-gray-100 dark:bg-gray-700 leading-6">
      <div className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      </div>
      <main className="w-full p-4 mx-auto md:w-2/3">
        <nav>
          <h1 className="py-4 font-serif text-4xl text-left">
            <Link to={`/`}>{title}</Link>
          </h1>
          <Link to={`/blog/archives`}>Archives</Link>
          <Link to={`/about`}>About</Link>
          <Link to={`/uses`}>Uses</Link>
          <Link to={`/posts/1`}>Blog</Link>
          <Link to={`/search`}>Search</Link>
        </nav>
        {children}
      </main>

      <footer>
        <div className="w-full p-4 mx-auto text-center md:w-2/3">
          <p>&copy; Matthew Daly {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
    )
}

export default Layout
