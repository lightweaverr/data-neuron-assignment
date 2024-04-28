// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  userId: {
    type: String,
    unique: true,
    default: () => {
      // Generate a unique ID using a timestamp and a random number
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);