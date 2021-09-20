import React, { ReactElement } from "react"

const ContactForm = (): ReactElement => (
  <form method="post" action="https://getform.io/f/b040a476-171d-418a-a8ba-a521b8f8853e" className="w-full p-4 mx-auto my-8 text-white bg-blue-600 border-2 border-white rounded-lg shadow-lg dark:border-black text-black">
    <label htmlFor="email" className="float-left w-1/3 p-2 my-4">
    Email
    </label>
    <input type="email" name="email" required autoComplete="email" className="float-right w-2/3 p-2 my-4 border-2 rounded-lg" />
    <label htmlFor="name" className="float-left w-1/3 p-2">
    Name
    </label>
    <input type="text" name="name" required autoComplete="name" className="float-right w-2/3 p-2 my-4 border-2 rounded-lg" />
    <label htmlFor="message" className="float-left w-1/3 p-2">
    Message
    </label>
    <textarea name="message" required className="float-right w-2/3 p-2 border-2 rounded-lg resize-none" />
    <div className="clear-both" />
    <input type="submit" value="Send" className="w-full p-2 mt-8 text-black bg-white border-2 rounded-lg shadow-lg md:w-40" />
  </form>
)

export default ContactForm
