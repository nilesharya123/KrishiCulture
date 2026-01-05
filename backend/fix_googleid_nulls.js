const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });
if (!process.env.MONGO_URI) dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/krishiculture';

mongoose.connect(mongoUri)
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const db = mongoose.connection.db;
            const collection = db.collection('users');

            // Find users with googleId: null
            const count = await collection.countDocuments({ googleId: null });
            console.log(`Found ${count} users with googleId: null`);

            if (count > 0) {
                // Unset googleId for these users
                const result = await collection.updateMany(
                    { googleId: null },
                    { $unset: { googleId: "" } }
                );
                console.log(`Unset googleId for ${result.modifiedCount} users.`);
            }

            // Also check for googleId: "null" string just in case
            const countStr = await collection.countDocuments({ googleId: "null" });
            if (countStr > 0) {
                await collection.updateMany(
                    { googleId: "null" },
                    { $unset: { googleId: "" } }
                );
                console.log(`Unset googleId:"null" for ${countStr} users.`);
            }

            console.log('Done cleaning googleId fields.');

        } catch (error) {
            console.error('Error:', error);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error(err));
