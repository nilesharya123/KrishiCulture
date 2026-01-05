const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback', // Absolute path is safer for local dev
            prompt: 'select_account' // Forces account selection
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // If new user, create entry
                user = new User({
                    googleId: profile.id,
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                });

                await user.save();
                done(null, user);
            } catch (err) {
                console.error('Google Auth Error:', err);
                done(err, null);
            }
        }
    )
);

// Serialize/Deserialize not strictly needed for JWT but good for session scaffolding if needed later
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
