const mongoose = require('mongoose');

const farmerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    landSize: {
        type: String, // e.g., "5 acres" or "2 hectares"
    },
    farmingType: {
        type: String,
        enum: ['crop', 'livestock', 'both'],
        required: true
    },
    crops: [{
        type: String
    }],
    livestock: [{
        type: String
    }],
    experienceYears: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FarmerProfile', farmerProfileSchema);
