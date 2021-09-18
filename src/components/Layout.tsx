import React, { Fragment } from "react"
import { Link } from "gatsby"
import Footer from "./Footer"
import Nav from "./Nav"

interface Props {
  title: string;
  children: React.ReactElement | React.ReactElement[];
}

const Layout = ({ title, children }: Props): React.ReactElement => {
  return (
    <Fragment>
      <div className="flex flex-col min-h-screen pb-16 font-sans text-lg antialiased text-gray-800 bg-gray-50 dark:text-gray-100 dark:bg-gray-700 leading-6">
        <div className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500" />
        <nav className="w-full p-4 mx-auto lowercase md:w-2/3">
          <h1 className="block float-none py-4 text-4xl text-center lg:float-left lg:text-left">
            <Link to={"/"}>{title}</Link>
          </h1>
          <Nav />
        </nav>

        <div className="w-full h-4 clear" />

        <main className="flex-grow w-full p-4 mx-auto md:w-2/3">
          {children}
        </main>
      </div>

      <Footer />
    </Fragment>
  )
}

export default Layout
