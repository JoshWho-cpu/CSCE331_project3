import React from 'react'
import { useState } from 'react'
import SideBar from '../components/SideBar'

const ManagerMain = () => {
  return (
    <div className="bg-gray-100 h-screen flex">
      <div className="w-1/4 bg-grey h-screen sticky top-0">
        <SideBar />
      </div>
      <div>Manager Main</div>
    </div>
  )
}

export default ManagerMain