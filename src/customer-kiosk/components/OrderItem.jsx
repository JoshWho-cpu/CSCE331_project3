import React from 'react'
import PropTypes from 'prop-types'

const OrderItem = ({ item, removeFromOrder }) => {
    const handleRemove = () => {
        removeFromOrder(item.id);
    };

    return (
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <p className="text font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">x{item.quantity}</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-sm font-medium font-mono">${item.price.toFixed(2)}</p>
                <button 
                    onClick={handleRemove}
                    className="text-sm text-red-500 cursor-pointer hover:text-red-700"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
}

export default OrderItem