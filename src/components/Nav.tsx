import React from "react"
import NavLink from "./NavLink"

const Nav = (): React.ReactElement => (
  <ul className="py-2 text-center lg:float-right md:block lg:text-left">
    <NavLink to={"/blog/archives"} text="Archives" />
    <NavLink to={"/about"} text="About" />
    <NavLink to={"/uses"} text="Uses" />
    <NavLink to={"/posts/1"} text="Blog" />
    <NavLink to={"/blog/categories"} text="Categories" />
    <NavLink to={"/search"} text="Search" />
  </ul>
)

export default Nav
