import React from 'react'
import PropTypes from 'prop-types'

const OrderItem = ({ item }) => {
  return (
    <div className="rounded-lg bg-white p-2">
      <div className="flex justify-between">
        <p>${item.id}</p>
        <p>${item.employee_id}</p>
        <p>${item.total_price.toFixed(2)}</p>
        <p>${item.date}</p>
      </div>
    </div>
  )
}

OrderItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default OrderItem