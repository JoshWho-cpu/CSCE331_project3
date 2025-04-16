import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Logo/Branding Bar */}
      <div className="flex w-full h-16 bg-white rounded-lg flex items-center p-2">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-orange-500">ShareTea</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="h-full px-6 bg-gray-100 rounded-sm text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="w-full h-16 bg-white rounded-lg flex items-center p-2 gap-2">
        {/* Search Bar - Takes most of the space */}
        <div className="flex-1 h-full">
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
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

Header.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired
};

export default Header