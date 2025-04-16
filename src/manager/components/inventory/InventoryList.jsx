import React from 'react'
import PropTypes from 'prop-types'
import InventoryItem from './InventoryItem'
import { useEffect, useState } from 'react'

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState(null);
  const [newInventoryName, setNewInventoryName] = useState('');
  const [newInventoryUnits, setNewInventoryUnits] = useState('');
  
    useEffect(() => {
      fetch('https://csce331-project3-backend.onrender.com/inventories')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch inventories');
          return res.json();
        })
        .then(data => setInventories(data))
        .catch(err => setError(err.message));
    }, []);

    const handleChange = (id, field, value) => {
        setInventories(prevInventories =>
            prevInventories.map(p =>
            i.id === id ? { ...i, [field]: value } : p
            )
        );
    };

    const handleSave = async (id) => {
      const updatedInventory = inventories.find(i => i.id === id);
      console.log('Saving invenotry:', updatedInventory);
      try {
        const response = await fetch(`https://csce331-project3-backend.onrender.com/inventory/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });      
  
        if (!response.ok) {
            throw new Error('Inventory update failed');
        }
      } catch (error) {
        console.error('Error saving inventory:', error);
      }
    };

    const handleAddInventory = async () => {
      const newInventory = {
        name: newInventoryName,
        units: newInventoryUnits
      };
    
      try {
        const response = await fetch('https://csce331-project3-backend.onrender.com/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newInventory),
        });
    
        if (!response.ok) throw new Error('Failed to add product');
    
        const addedInventory = await response.json();
    
        // Add the new product to the list
        setInventories(prev => [...prev, addedInventory]);
    
        // Clear the form
        setNewInventoryName('');
        setNewInventoryUnits('');
      } catch (err) {
        console.error('Error adding product:', err.message);
      }
    };

    if (error) return <div>Error: {error}</div>;
    if (inventories.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
        
      <h3>Add New Inventory Item</h3>
      <div style={{ border: '1px solid green', padding: '10px', marginTop: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            value={newInventoryName}
            onChange={(e) => setNewInventoryName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Units:
          <input
            type="text"
            value={newInventoryUnits}
            onChange={(e) => setNewInventoryUnits(e.target.value)}
          />
        </label>
        <br />
        <button
          onClick={handleAddInventory}
          disabled={!newInventoryName || !newInventoryUnits }
        >
          Add Inventory Item
        </button>
      </div>

      <InventoryItem item={{ id: 'ID', name: 'Name', units: 'Units' }} />
      {inventories.map(item => (
        <InventoryItem
          key={item.id}
          item={item}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      ))}
    </div>
  );
};

InventoryList.propTypes = {
  items: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default InventoryList;
