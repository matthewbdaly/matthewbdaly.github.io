import React, { Fragment } from "react"
import { Link } from "gatsby"
import NavLink from "./NavLink"

interface Props {
  title: string;
  children: React.ReactElement | React.ReactElement[];
}

const Layout = ({ title, children }: Props): React.ReactElement => {
  return (
    <Fragment>
      <div className="flex flex-col min-h-screen font-serif text-lg text-gray-800 bg-gray-200 dark:text-gray-100 dark:bg-gray-700 leading-6">
        <div className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500" />
        <nav className="w-full p-4 mx-auto md:w-2/3 lowercase">
          <h1 className="block float-none lg:float-left py-4 text-4xl text-center lg:text-left">
            <Link to={"/"}>{title}</Link>
          </h1>
          <div className="lg:float-right py-2 md:block text-center lg:text-left">
            <NavLink to={"/blog/archives"} text="Archives" />
            <NavLink to={"/about"} text="About" />
            <NavLink to={"/uses"} text="Uses" />
            <NavLink to={"/posts/1"} text="Blog" />
            <NavLink to={"/blog/categories"} text="Categories" />
            <NavLink to={"/search"} text="Search" />
          </div>
        </nav>

        <div className="w-full h-4 clear" />

        <main className="flex-grow w-full p-4 mx-auto md:w-2/3">
          {children}
        </main>
      </div>

      <footer className="w-full p-4 text-gray-100 bg-gray-800">
        <div className="w-full p-4 mx-auto text-center md:w-2/3">
          <p>&copy; Matthew Daly {new Date().getFullYear()}</p>
        </div>
      </footer>
    </Fragment>
  )
}

export default Layout
