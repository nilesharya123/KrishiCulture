const CommunityPost = require('../models/Community');

// @desc    Get all community posts
// @route   GET /api/community/all
const getAllPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find()
            .populate('author', 'fullName role') // minimal user info
            .populate('comments.user', 'fullName')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new community post
// @route   POST /api/community/create
const createPost = async (req, res) => {
    try {
        const { content, tags } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        // Parse tags if sent as string (from FormData)
        let parsedTags = [];
        if (tags) {
            parsedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
        }

        const newPost = new CommunityPost({
            content,
            image: imageUrl,
            tags: parsedTags,
            author: req.user.id
        });

        const savedPost = await newPost.save();

        // Populate author for immediate frontend display
        await savedPost.populate('author', 'fullName role');

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a comment to a post
// @route   POST /api/community/comment/:postId
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.postId;

        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            user: req.user.id,
            text,
            date: new Date()
        };

        post.comments.unshift(newComment); // Add to top
        await post.save();

        // Populate the user of the new comment to return it
        // Re-fetching or manual population might be needed depending on Mongoose version, 
        // but simplest is to populate the whole comments array or just the latest one.
        // For simplicity/speed, we'll re-populate the specific post.
        const updatedPost = await CommunityPost.findById(postId)
            .populate('author', 'fullName role')
            .populate('comments.user', 'fullName');

        res.json(updatedPost);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    addComment
};
