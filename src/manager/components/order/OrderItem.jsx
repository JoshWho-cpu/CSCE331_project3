import React from 'react'
import PropTypes from 'prop-types'

const OrderItem = ({ item }) => {
  return (
    <div className="rounded-lg bg-white p-2">
      <div className="flex justify-between">
        <p>{item.id}</p>
        <p>{item.employee_id}</p>
        <p>{typeof item.total_price === "number" ? `$${item.total_price.toFixed(2)}` : item.total_price}</p>
        <p>{item.order_date}</p>
      </div>
    </div>
  )
}

OrderItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default OrderItem