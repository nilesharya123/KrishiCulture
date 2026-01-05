const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './backend/.env' }); // try backend/.env
// Fallback if that didn't work (if running from root)
if (!process.env.MONGO_URI) {
    dotenv.config();
}

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/krishiculture';

console.log('Connecting to MongoDB:', mongoUri);

mongoose.connect(mongoUri)
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const db = mongoose.connection.db;
            const collection = db.collection('users');

            // List indexes
            const indexes = await collection.indexes();
            console.log('Current Indexes:', indexes);

            // Drop the problematic index
            const indexName = 'googleId_1';
            const indexExists = indexes.some(idx => idx.name === indexName);

            if (indexExists) {
                await collection.dropIndex(indexName);
                console.log(`Successfully dropped index: ${indexName}`);
                console.log('Please restart your backend server. Mongoose will recreate the index with the correct "sparse" option.');
            } else {
                console.log(`Index ${indexName} not found. checking for other potential googleId indexes...`);
                // Check if any index involves googleId
                const googleIndex = indexes.find(idx => idx.key.googleId);
                if (googleIndex) {
                    await collection.dropIndex(googleIndex.name);
                    console.log(`Dropped found googleId index: ${googleIndex.name}`);
                } else {
                    console.log('No googleId index found to drop.');
                }
            }

        } catch (error) {
            console.error('Error during index operation:', error);
        } finally {
            mongoose.disconnect();
            console.log('Disconnected');
        }
    })
    .catch(err => {
        console.error('Connection Error:', err);
    });
