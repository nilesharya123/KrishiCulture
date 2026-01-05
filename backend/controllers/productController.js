const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'fullName mobile location');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Image handling
        let imageUrl = '';
        if (req.file) {
            // In production, upload to cloud storage (S3/Cloudinary)
            // For local, we serve static files or assume relative path
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: imageUrl,
            seller: req.user._id // From authMiddleware
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Create Product Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProducts, createProduct };
