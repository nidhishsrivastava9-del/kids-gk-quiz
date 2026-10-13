const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('💡 No MONGODB_URI provided. Running in lightning-fast In-Memory data mode with full feature support!');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log(`⚠️ MongoDB connection skipped (${error.message}). Operating smoothly in in-memory mode.`);
    isConnected = false;
    return false;
  }
};

module.exports = { connectDB, getIsConnected: () => isConnected };
