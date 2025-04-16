import express from 'express';
// import pg from 'pg';  // Default import
// const { Pool } = pg;  // Destructure the Client from the pg module
// import dotenv from 'dotenv';
// const env = dotenv.config();
// index.js in the backend (Node/Express)
import cors from 'cors';
import pool from '../config/db.js';
import employeeDAO from './daos/employeeDAO.js';
import orderDAO from './daos/orderDAO.js';
import orderDetailDAO from './daos/orderDetailDAO.js';
import Employee from './models/employee.js';
import productDAO from './daos/productDAO.js';
import Product from './models/product.js';
import inventoryDAO from './daos/inventoryDAO.js';
import Inventory from './models/inventory.js';
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173', // Your React app's address
    credentials: true
  }));

// app.set("view engine", "ejs");

app.use(express.json());

// Menu items endpoint
app.get('/api/menu', async (req, res) => {
    try {
      const products = await productDAO.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching menu:', error);
      res.status(500).json({ message: 'Failed to fetch menu items' });
    }
  });

app.get('/', (req, res) => {
    const data = {name: 'Mario'};
    res.send('index');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const employee = await employeeDAO.getEmployeeByNamePassword(username, password);
    if(employee == null) {
        res.status(400).json({message: "bad user"});
    } else {
        res.status(200).json(employee);
    }
});
app.get('/products', async (req, res) => {
    const { category = 'all' } = req.query;
    const products = await productDAO.getAllProducts();
    if(products == null) {
        res.status(400).json({message: "bad request"});
    } else {
        res.status(200).json(products);
    }
    
});
app.get('/product/:id', async (req, res) => {
    const {id} = req.params;
    let product = null;
    if(id != -1) {
        product = await productDAO.getProductById(id);
    }
    if(product == null) {
        res.status(400).json({message: "Product not found"});
    } else {
        res.status(200).json(product)
    }
});
app.post('/product', async (req, res) => {
    const {name, price, category, image = ""} = req.body;
    let product = null;
    let p = new Product(0, name, price, category, image);
    try {
        let newp = await productDAO.addProduct(p);
        res.status(200).json(newp);
    } catch(error) {
        res.status(500).json(error);
    }
});
app.put('/product/:id', async (req, res) => {
    const {id} = req.params;
    const {name, price, category, image} = req.body;
    let product = new Product(id, name, price, category, image);
    product = await productDAO.updateProduct(product);
    if(!product) {
        return res.status(404).json({message: 'Product not found'});
    }
    return res.status(200).json(product);

    
});
app.delete('/product/:id', async (req, res) => {
    const {id} = req.params;
    let status = await productDAO.deleteProduct(id);
    if(!status) {
        return res.status(404).json({message: 'Product not found'});
    }
    return res.status(200).json(id);
});

//Ingredients API
app.get('/inventories', async (req, res) => {
    const { category = 'all' } = req.query;
    const inventory = await inventoryDAO.getAllInventory();
    if(inventory == null) {
        res.status(400).json({message: "bad request"});
    } else {
        res.status(200).json(inventory);
    }
});

app.get('/inventory/:id', async (req, res) => {
    const {id} = req.params;
    let inventory = null;
    inventory = await inventoryDAO.getInventoryById(id);
    if(inventory == null) {
        res.status(400).json({message: "Inventory not found"});
    } else {
        res.status(200).json(inventory);
    }
});
app.post('/inventory', async (req, res) => {
    const {name, units} = req.body;
    let p = new Inventory(0, name, units);
    try {
        let newp = await inventoryDAO.addInventory(p);
        console.log(newp);
        res.status(200).json(newp);
    } catch(error) {
        res.status(500).json(error);
    }
});
app.put('/inventory/:id', async (req, res) => {
    const {id} = req.params;
    const {name, units} = req.body;
    let inventory = new Inventory(id, name, units);
    inventory = await inventoryDAO.updateInventory(inventory);
    if(!inventory) {
        return res.status(404).json({message: 'Inventory not found'});
    }
    return res.status(200).json(inventory);
});
app.delete('/inventory/:id', async (req, res) => {
    const {id} = req.params;
    let status = await inventoryDAO.deleteInventory(id);
    if(!status) {
        return res.status(404).json({message: 'Inventory not found'});
    }
    return res.status(200).json(id);
});


//employee stuff
app.get('/employees', async (req, res) => {
    const employees = await employeeDAO.getAllEmployees();
    if(employees == null) {
        res.status(400).json({message: "bad request"});
    } else {
        res.status(200).json(employees);
    }
});

app.get('/employee/:id', async (req, res) => {
    const {id} = req.params;
    let employee = null;
    employee = await employeeDAO.getEmployeeById(id);
    if(employee == null) {
        res.status(400).json({message: "Employee not found"});
    } else {
        res.status(200).json(employee);
    }
});
app.post('/employee', async (req, res) => {
    const {name, role, password} = req.body;
    let p = new Employee(0, name, role, password);
    try {
        let newp = await employeeDAO.addEmployee(p);
        res.status(200).json(p);
    } catch(error) {
        res.status(500).json(error);
    }
});
app.put('/employee/:id', async (req, res) => {
    const {id} = req.params;
    const {name, role, password} = req.body;
    let employee = new Employee(id, name, role, password);
    employee = await employeeDAO.updateEmployee(employee);
    if(!employee) {
        return res.status(404).json({message: 'Employee not found'});
    }
    return res.status(200).json(employee);
});
app.delete('/employee/:id', async (req, res) => {
    const {id} = req.params;
    let status = await employeeDAO.deleteEmployee(id);
    if(!status) {
        return res.status(404).json({message: 'Employee not found'});
    }
    return res.status(200).json(id);
});


// {
//     "order": {
//         "id": 100,
//         "total_price": 100,
//         "employee_id": 9,
//         "order_date": "2025-04-07 12:00:00"
//     },
//     "products": [1,2,3,4,5]
// }
app.post('/placeorder', async (req, res) => {
    const { order, products } = req.body;
    const neworder = await orderDAO.addOrder(order);
    
    await products.map((product_id) => orderDetailDAO.addOrderDetail(neworder.id, product_id));
    res.status(200).json(neworder);
});

app.get('/orders', async (req, res) => {
    const orders = await orderDAO.getAllOrders();
    if(orders == null) {
        res.status(400).json({message: "bad request"});
    } else {
        res.status(200).json(orders);
    }
});

app.get('/orders/:id', async (req, res) => {
    const {id} = req.params;
    let order = null;
    order = await orderDAO.getOrderById(id);
    if(order == null) {
        res.status(400).json({message: "Order not found"});
    } else {
        res.status(200).json(order);
    }
});
app.put('/orders/:id', async (req, res) => {
    const {id} = req.params;
    const {name, role, password} = req.body;
    let order = new Order(id, name, role, password);
    order = await orderDAO.updateOrder(order);
    if(!order) {
        return res.status(404).json({message: 'Order not found'});
    }
    return res.status(200).json(order);
});
app.delete('/orders/:id', async (req, res) => {
    const {id} = req.params;
    let status = await orderDAO.deleteOrder(id);
    if(!status) {
        return res.status(404).json({message: 'Order not found'});
    }
    return res.status(200).json(id);
});

app.get('/test', async (req, res) => {
    const e = await employeeDAO.getEmployeeByName("Aiden");
    if(e == null) {
        res.status(400).json({message: "bad user"});
    } else {
        res.status(200).json(e);
    }
});
app.get('/user', (req, res) => {
    let teammembers = [];
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            res.send(data);        
        });
});
app.get('/employees', async (req, res) => {
    console.log("getting employees");
    const employees = await employeeDAO.getAllEmployees();
    if(employees == null) {
        res.status(400).json({message: "bad user"});
    } else {
        res.status(200).json(employees);
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
