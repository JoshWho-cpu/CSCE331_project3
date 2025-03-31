import React from 'react'
import PropTypes from 'prop-types'
import OrderItem from './OrderItem'

const OrderSummary = ({ order, setOrderItems }) => {
  const TAX_RATE = 0.0825; // 8.25% tax rate

  const calculateSubtotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const removeFromOrder = (itemId) => {
    setOrderItems(prevItems => {
      // Find the item in the order
      const itemToUpdate = prevItems.find(item => item.id === itemId);

      // If it has quantity > 1, decrement quantity
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      // Otherwise remove the item completely
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex flex-col gap-2 items-center border-b border-gray-100 p-4">
        <h1 className="text-2xl font-semi-bold">Piyush's Order</h1>
        <p className="text-sm text-gray-400">Order #: 1234567890</p>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex-col overflow-y-auto p-4 space-y-4">
          {order.map((item) => (
            <OrderItem key={item.id} item={item} removeFromOrder={removeFromOrder} />
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between text-gray-400">
              <p className="text-sm">Subtotal</p>
              <p className="text-sm font-mono">${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between text-gray-400">
              <p className="text-sm">Tax(8.25%)</p>
              <p className="text-sm font-mono">${calculateTax().toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between pt-2">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold font-mono">${calculateTotal().toFixed(2)}</p>
            </div>
            <button className="bg-orange-500 p-4 text-xl text-white rounded-lg hover:bg-orange-600 transition-all duration-300 cursor-pointer mt-4" type="submit">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

OrderSummary.propTypes = {
  order: PropTypes.array.isRequired,
  setOrderItems: PropTypes.func.isRequired
};

export default OrderSummary