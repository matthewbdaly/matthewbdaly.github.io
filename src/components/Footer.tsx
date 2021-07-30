import React from "react"

const Footer = (): React.ReactElement => (
  <footer className="w-full p-4 text-gray-100 bg-gray-800">
    <div className="w-full p-4 mx-auto text-center md:w-2/3">
      <p>&copy; Matthew Daly {new Date().getFullYear()}</p>
    </div>
  </footer>
)

export default Footer
