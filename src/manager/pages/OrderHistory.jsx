import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import OrderList from '../components/OrderList'

const OrderHistory = () => {
  // dummy orders
  const [orders, setOrders] = useState([
    { id: 1, employee_id: 1, total_price: 5.95, date: '2023-10-01T12:00:00Z' },
    { id: 2, employee_id: 2, total_price: 10.50, date: '2023-10-01T12:05:00Z' },
    { id: 3, employee_id: 1, total_price: 7.25, date: '2023-10-01T12:10:00Z' },
    { id: 4, employee_id: 3, total_price: 15.00, date: '2023-10-01T12:15:00Z' },
    { id: 5, employee_id: 2, total_price: 8.75, date: '2023-10-01T12:20:00Z' },
    { id: 6, employee_id: 1, total_price: 12.50, date: '2023-10-01T12:25:00Z' },
    { id: 7, employee_id: 3, total_price: 9.95, date: '2023-10-01T12:30:00Z' },
    { id: 8, employee_id: 2, total_price: 6.50, date: '2023-10-01T12:35:00Z' },
    { id: 9, employee_id: 1, total_price: 11.00, date: '2023-10-01T12:40:00Z' },
    { id: 10, employee_id: 3, total_price: 14.75, date: '2023-10-01T12:45:00Z' },
  ]);

  return (
    <div className="bg-gray-100 h-screen flex">
      <div className="w-1/4 bg-grey h-screen sticky top-0">
        <SideBar />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto m-4 flex flex-col gap-4">
        <Header />
        <OrderList orders={orders} />
      </div>
    </div>
  )
}

export default OrderHistory