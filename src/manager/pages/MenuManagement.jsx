import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import MenuList from '../components/MenuList'

function EmployeeMangement() {
  return (
    <div className="bg-gray-100 h-screen flex">
      <div className="w-1/4 bg-grey h-screen sticky top-0">
        <SideBar />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto m-4 flex flex-col gap-4">
        <Header />
        <MenuList />
      </div>
    </div>
  )
}

export default EmployeeMangement;

