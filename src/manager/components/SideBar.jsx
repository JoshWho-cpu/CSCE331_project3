import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-white h-screen">
      <nav className=" flex flex-col gap-6 p-4">
      <Link to="/manager/OrderHistory" className="rounded-lg bg-orange-100 hover:bg-blue-100">Order History</Link>
      <Link to="/manager/EmployeeManagement" className="rounded-lg bg-orange-100 hover:bg-blue-100">Employee Management</Link>
      <Link to="/manager/MenuManagement" className="rounded-lg bg-orange-100 hover:bg-blue-100">Menu Management</Link>
      <Link to="/manager/InventoryManagement" className="rounded-lg bg-orange-100 hover:bg-blue-100">Inventory Management</Link>
      {/* <Link to="/manager/ReportGeneration" className="rounded-lg bg-orange-100 hover:bg-blue-100">Report Generation</Link> */}
      </nav>
    </div>
  )
}

export default Sidebar