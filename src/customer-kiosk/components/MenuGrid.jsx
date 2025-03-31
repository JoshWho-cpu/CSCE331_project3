import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from './MenuItem'

const MenuGrid = ({ menuItems, addToOrder }) => {
    return (
      <div className="pl-4 pr-4 pb-4 menu-grid grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} addToOrder={addToOrder} />
        ))}
      </div>
    );
  };

MenuGrid.propTypes = {
    menuItems: PropTypes.array.isRequired,
    addToOrder: PropTypes.func.isRequired
}

export default MenuGrid