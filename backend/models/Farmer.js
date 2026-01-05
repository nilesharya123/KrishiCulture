const mongoose = require('mongoose');

const aiConsultationSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    imageUrl: String,
    diagnosis: String,
    recommendation: String,
    weatherContext: Object // Store weather data at time of consultation
});

const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String, // Or GeoJSON based on requirements
        required: true
    },
    preferredLanguage: {
        type: String,
        default: 'en'
    },
    crops: [String],
    aiConsultations: [aiConsultationSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Farmer', farmerSchema);
