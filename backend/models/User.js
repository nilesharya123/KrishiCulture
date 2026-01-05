const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple null values (for local users)
    },
    password: {
        type: String, // Required only for local auth
    },
    role: {
        type: String,
        enum: ['farmer', 'expert', 'admin'],
        default: 'farmer'
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    // Basic profile details collected during onboarding
    mobile: String,
    language: {
        type: String,
        default: 'en'
    },
    location: {
        state: String,
        district: String,
        village: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
