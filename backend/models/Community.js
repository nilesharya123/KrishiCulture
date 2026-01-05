const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema],
    tags: [String], // e.g. 'PestControl', 'Advice'
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);
