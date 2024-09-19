import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {

  return (
    <div>
    <div className="flex  fixed bottom-0 w-full  items-center justify-center gap-5 py-2">
    <Link to="/" className=" justify-center ">
      <button className="px-8 bg-gray-400  py-1 rounded-lg">
        Continue
      </button>
    </Link>
  </div>
    </div>
  )
}

export default Footer
