import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDb = async () => {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGODB_URI);
};

const clearDatabase = async () => {
  try {
    await connectToDb();
    const db = mongoose.connection;

    // Clear collections
    await db.collection('artists').deleteMany({});
    await db.collection('albums').deleteMany({});
    await db.collection('songs').deleteMany({});

    console.log('Database cleared successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

// Run the clear script
clearDatabase();
