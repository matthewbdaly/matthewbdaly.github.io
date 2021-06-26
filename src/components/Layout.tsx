import React from "react"
import { Link } from "gatsby"

const Layout = ({ title, children }) => {
    return (
    <div className="min-h-screen font-sans text-lg text-gray-800 bg-gray-200 dark:text-gray-100 dark:bg-gray-700 leading-6">
      <div className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      </div>
      <main className="w-full p-4 mx-auto md:w-2/3">
        <h1 className="w-1/2 p-4 mx-auto text-4xl text-center text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text">
            <Link to={`/`}>{title}</Link>
        </h1>
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
