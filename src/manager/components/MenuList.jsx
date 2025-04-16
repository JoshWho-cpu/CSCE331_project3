import React from 'react'
import { useEffect, useState } from 'react'

const MenuList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductImage, setNewProductImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message));
  }, []);

  const handleChange = (id, field, value) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const handleSave = async (id) => {
    const updatedProduct = products.find(p => p.id === id);
    console.log('Saving product:', updatedProduct);
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });      

      if (!response.ok) {
          throw new Error('Product update failed');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: newProductName,
      price: newProductPrice,
      category: newProductCategory,
      image: newProductImage
    };
  
    try {
      const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
  
      if (!response.ok) throw new Error('Failed to add product');
  
      const addedProduct = await response.json();
  
      // Add the new product to the list
      setProducts(prev => [...prev, addedProduct]);
  
      // Clear the form
      setNewProductName('');
      setNewProductPrice('');
      setNewProductCategory('');
      setNewProductImage('');
    } catch (err) {
      console.error('Error adding product:', err.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h3>Add New Product</h3>
      <div style={{ border: '1px solid green', padding: '10px', marginTop: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(e.target.value)}
          />
        </label>
        <br />
        <button
          onClick={handleAddProduct}
          disabled={!newProductName || !newProductPrice || !newProductCategory}
        >
          Add Product
        </button>
      </div>
      <h2>Edit Products</h2>
      {products.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <div><strong>ID:</strong> {p.id}</div>
          <label>
            Name:&nbsp;
            <input
              type="text"
              value={p.name}
              onChange={(e) => handleChange(p.id, 'name', e.target.value)}
            />
          </label>
          <br />
          <label>
            Price:&nbsp;
            <input
              type="text"
              value={p.price}
              onChange={(e) => handleChange(p.id, 'price', e.target.value)}
            />
          </label>
          <br />
          <label>
            Category:&nbsp;
            <input
              type="text"
              value={p.category}
              onChange={(e) => handleChange(p.id, 'category', e.target.value)}
            />
          </label>
          <button onClick={() => handleSave(p.id)}>Save</button>
        </div>
      ))}
    </div>
  );
}

export default MenuList