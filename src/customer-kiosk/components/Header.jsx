import React from 'react'

const Header = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Logo/Branding Bar */}
      <div className="w-full h-16 bg-white rounded-lg flex items-center px-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-orange-500">ShareTea</h1>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="w-full h-16 bg-white rounded-lg flex items-center p-2 gap-2">
        {/* Search Bar - Takes most of the space */}
        <div className="flex-1 h-full">
          <input 
            type="text" 
            placeholder="Search menu items..." 
            className="w-full h-full rounded-sm bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        {/* Filter Button */}
        <button className="h-full px-6 bg-orange-500 rounded-sm text-white font-medium hover:bg-orange-600 transition-colors">
          Filter
        </button>
      </div>
    </div>
  )
}

export default Header