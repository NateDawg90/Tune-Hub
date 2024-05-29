import mongoose, { connect } from 'mongoose';

// mongoose.connect(process.env.MONGODB_URI!);
// mongoose.Promise = global.Promise;

async function connectToDb() {
  // 4. Connect to MongoDB
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    console.log('Connecting to MongoDB...');
    await connect(process.env.MONGODB_URI!);
    mongoose.Promise = global.Promise;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export default connectToDb;
