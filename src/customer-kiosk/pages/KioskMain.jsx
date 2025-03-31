import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import MenuGrid from '../components/MenuGrid'
import OrderSummary from '../components/OrderSummary'

const KioskMain = () => {
  // dummy menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Wintermelon Tea', price: 5.95 },
    { id: 2, name: 'Classic Milk Tea', price: 5.95 },
    { id: 3, name: 'Matcha Latte', price: 5.95 },
    { id: 4, name: 'Mango Smoothie', price: 5.95 },
    { id: 5, name: 'Strawberry Smoothie', price: 5.95 },
    { id: 6, name: 'Peach Smoothie', price: 5.95 },
    { id: 7, name: 'Avocado Smoothie', price: 5.95 },
    { id: 8, name: 'Taro Smoothie', price: 5.95 },
    { id: 9, name: 'Chocolate Smoothie', price: 5.95 },
    { id: 10, name: 'Vanilla Smoothie', price: 5.95 },
    { id: 11, name: 'Mango Slush', price: 5.95 },
    { id: 12, name: 'Strawberry Slush', price: 5.95 },
    { id: 13, name: 'Passion Fruit Tea', price: 5.95 },
    { id: 14, name: 'Lychee Tea', price: 5.95 },
    { id: 15, name: 'Green Tea', price: 4.95 },
    { id: 16, name: 'Jasmine Tea', price: 4.95 }
  ]);

  // dummy order
  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (menuItem) => {
    setOrderItems(prevItems => {
      // Check if item already exists in order
      const existingItem = prevItems.find(item => item.id === menuItem.id);

      if (existingItem) {
        // Increment quantity if it exists
        return prevItems.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...menuItem, quantity: 1 }];
      }
    });
  };

  return (
    <div className="bg-gray-100 h-screen flex">
      <div className="w-3/4 h-screen overflow-y-auto flex flex-col">
        <Header />
        <MenuGrid menuItems={menuItems} addToOrder={addToOrder} />
      </div>
      <div className="w-1/4 h-screen sticky top-0">
        <OrderSummary
          order={orderItems}
          setOrderItems={setOrderItems}
        />
      </div>
    </div>
  )
}

export default KioskMain