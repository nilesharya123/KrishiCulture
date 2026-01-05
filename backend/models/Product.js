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
        ref: 'User' // Correctly referencing User model
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
