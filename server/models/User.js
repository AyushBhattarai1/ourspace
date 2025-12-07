import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  password_hash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
