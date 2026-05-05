// Application entry point: configures Express, registers middleware and routes

const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = 3000;

// Step 1: Connect to the database
connectDB();

// Step 2: Register middleware
// express.json() allows the server to parse JSON request bodies
app.use(express.json());

// Step 3: Register routes
// All requests starting with /products are handled by routes/products.js
app.use('/products', require('./routes/products'));

// Root route (health check)
app.get('/', (req, res) => {
  res.json({
    message: '🎮 Online Game Store API is running',
    endpoints: {
      'Add product':        'POST   /products',
      'Get all products':   'GET    /products',
      'Filter by category': 'GET    /products?category=Consoles',
      'Get single product': 'GET    /products/:id',
      'Update product':     'PUT    /products/:id',
      'Delete product':     'DELETE /products/:id',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Step 4: Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});