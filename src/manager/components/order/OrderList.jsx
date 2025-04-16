import React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import OrderItem from './OrderItem'

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
    
    useEffect(() => {
      fetch('http://localhost:3000/orders')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch orders');
          return res.json();
        })
        .then(data => setOrders(data))
        .catch(err => setError(err.message));
    }, []);

    const handleChange = (id, field, value) => {
      setOrders(prevOrders =>
        prevOrders.map(p =>
        i.id === id ? { ...i, [field]: value } : p
        )
      );
    };

    const handleSave = async (id) => {
      const updatedOrder = orders.find(o => o.id === id);
      console.log('Saving order:', updatedOrder);
      try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });      
  
        if (!response.ok) {
            throw new Error('Order update failed');
        }
      } catch (error) {
        console.error('Error saving order:', error);
      }
    };

    if (error) return <div>Error: {error}</div>;
    if (orders.length === 0) return <div>Loading...</div>;

    return (
      <div className="flex flex-col gap-4">
        <OrderItem item={{ id: 'ID', employee_id: 'Employee ID', total_price: 'Total Price', order_date: 'Date' }} />
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