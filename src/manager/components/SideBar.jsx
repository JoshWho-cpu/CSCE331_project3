import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-white h-screen">
      <nav className=" flex flex-col gap-6 p-4">
        <Link to="/manager/OrderHistory" className="rounded-lg bg-orange-100 hover:bg-blue-100">Order History</Link>
      </nav>
    </div>
  )
}

export default Sidebar