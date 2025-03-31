import React from 'react'
import PropTypes from 'prop-types'

const MenuItem = ({ item, addToOrder }) => {
  return (
    <div className="rounded-lg bg-white p-2 hover:shadow-lg hover:shadow-lg hover:-translate-y-0.25 transition-all duration-300 cursor-pointer" onClick={() => addToOrder(item)}>
      <div className="relative w-full pb-[75%] bg-gray-200 rounded-sm"></div>
      <div className="flex flex-col gap-2 mt-2">
        <p className="text-md font-medium">{item.name}</p>
        <div className="flex items-center">
          <p className="font-mono text-sm bg-gray-100 rounded-sm px-2 py-0.5">${item.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired
}

export default MenuItem