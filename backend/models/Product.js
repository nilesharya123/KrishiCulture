const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String, // 'Seeds', 'Tools', 'Fertilizer'
        required: true
    },
    image: String,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer' // Or a separate Vendor schema if needed, assuming Farmer for peer-to-peer for now
    },
    stock: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
