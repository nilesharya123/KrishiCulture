const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
    text: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const communityPostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    }],
    comments: [commentSchema],
    tags: [String], // e.g. 'PestControl', 'Advice'
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);
