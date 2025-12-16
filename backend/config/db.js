import mongoose from 'mongoose';
import { MONGODB_URI } from './utils.js';

export default function connectDB() {
  const mongoOptions = {
    retryWrites: true,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    socketKeepAliveMS: 300000,
  };

  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    mongoose.connect(MONGODB_URI, mongoOptions);
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once('open', () => {
    console.log(`✅ Database connected successfully: ${MONGODB_URI}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`❌ MongoDB connection error: ${err.message}`);
  });

  dbConnection.on('disconnected', () => {
    console.warn('⚠️ Database disconnected');
  });

  dbConnection.on('reconnected', () => {
    console.log('✅ Database reconnected');
  });

  return dbConnection;
}
