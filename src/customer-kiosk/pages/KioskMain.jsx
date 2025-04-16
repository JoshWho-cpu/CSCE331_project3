import React, { useState, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import MenuGrid from '../components/MenuGrid'
import OrderSummary from '../components/OrderSummary'
import { getMenuItems } from '../../api/menuApi'

const KioskMain = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await getMenuItems();
        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu items');
        setLoading(false);
        console.error('Error loading menu items:', err);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter menu items based on search query
  const filteredMenuItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuItems;
    }

    const query = searchQuery.toLowerCase().trim();
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
    );
  }, [menuItems, searchQuery]);

  const addToOrder = (menuItem) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...menuItem, quantity: 1 }];
      }
    });
  };

  return (
    <div className="bg-gray-100 h-screen flex">
      <div className="w-3/4 h-screen overflow-y-auto flex flex-col">
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading menu items...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : filteredMenuItems.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">No items match your search</p>
          </div>
        ) : (
          <MenuGrid menuItems={filteredMenuItems} addToOrder={addToOrder} />
        )}
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