// Defines all product-related routes and handler functions

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ════════════════════════════════════════════════════════════
// ① POST /products — Add a new product
// ════════════════════════════════════════════════════════════
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newProduct = await Product.create({ name, description, price, category });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ════════════════════════════════════════════════════════════
// ② GET /products — Get all products (supports category filter)
// ════════════════════════════════════════════════════════════
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      // Case-insensitive partial match
      filter.category = { $regex: req.query.category, $options: 'i' };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ════════════════════════════════════════════════════════════
// ③ GET /products/:id — Get a single product by ID
// ════════════════════════════════════════════════════════════
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ════════════════════════════════════════════════════════════
// ④ PUT /products/:id — Update a product by ID
// ════════════════════════════════════════════════════════════
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, price, category } },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ════════════════════════════════════════════════════════════
// ⑤ DELETE /products/:id — Delete a product by ID
// ════════════════════════════════════════════════════════════
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: `Product "${deletedProduct.name}" has been deleted`,
      data: deletedProduct,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;