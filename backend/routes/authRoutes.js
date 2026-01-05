const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const FarmerProfile = require('../models/FarmerProfile');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Register User
// @route   POST /auth/register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            fullName,
            email,
            password: hashedPassword,
            role: role || 'farmer',
            isProfileComplete: false
        });

        await user.save();

        res.status(201).json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id),
            isProfileComplete: user.isProfileComplete
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Login User
// @route   POST /auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                img: user.role,
                token: generateToken(user._id),
                isProfileComplete: user.isProfileComplete
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        // Generate JWT
        const token = generateToken(req.user._id);

        // Redirect to frontend with token
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        // Check if profile is complete
        const redirectPath = req.user.isProfileComplete ? '/dashboard' : '/complete-profile';

        res.redirect(`${clientUrl}/auth/callback?token=${token}&isProfileComplete=${req.user.isProfileComplete}&redirect=${redirectPath}`);
    }
);

// @desc    Complete User Profile
// @route   POST /auth/complete-profile
router.post('/complete-profile', protect, async (req, res) => {
    try {
        const {
            mobile, language, location, role, // User updates
            landSize, farmingType, crops, livestock, experienceYears // Farmer specific
        } = req.body;

        // Update User Common Details
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.mobile = mobile;
        user.language = language;
        user.location = location;
        user.role = role || user.role;
        user.isProfileComplete = true; // Mark complete

        await user.save();

        // If Farmer, create profile
        if (user.role === 'farmer') {
            const profileFields = {
                user: user._id,
                landSize,
                farmingType,
                crops,
                livestock,
                experienceYears
            };

            let profile = await FarmerProfile.findOne({ user: user._id });
            if (profile) {
                // Update
                profile = await FarmerProfile.findOneAndUpdate({ user: user._id }, { $set: profileFields }, { new: true });
            } else {
                // Create
                profile = new FarmerProfile(profileFields);
                await profile.save();
            }
        }

        res.status(200).json({ success: true, data: user });

    } catch (error) {
        console.error('Profile Completion Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get Current User
// @route   GET /auth/me
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
