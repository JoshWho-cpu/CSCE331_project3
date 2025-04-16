// server/routes/api.js or customer-kiosk/api.js
const express = require('express');
const router = express.Router();

// Example endpoint: Get menu data
router.get('/menu', (req, res) => {
  const menuItems = [
    { id: 1, name: 'Burger', price: 5.99 },
    { id: 2, name: 'Pizza', price: 8.99 },
    // Add more items
  ];
  res.json(menuItems);
});

// Add more API routes as needed

module.exports = router;
