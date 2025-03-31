import React from 'react'
import PropTypes from 'prop-types'
import OrderItem from './OrderItem'

const OrderList = ({ orders }) => {
    return (
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderItem key={order.id} item={order} />
        ))}
      </div>
    );
  };

  OrderList.propTypes = {
    orders: PropTypes.array.isRequired
}

export default OrderList