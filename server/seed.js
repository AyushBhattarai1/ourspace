import bcrypt from 'bcrypt';
import connectDB from './db.js';
import User from './models/User.js';

async function seed() {
  try {
    await connectDB();
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Check if users already exist
    const existingUsers = await User.find({ email: { $in: ['ayush@couple.app', 'neha@couple.app'] } });
    
    if (existingUsers.length === 0) {
      await User.insertMany([
        {
          name: 'Ayush',
          email: 'ayush@couple.app',
          password_hash: hashedPassword
        },
        {
          name: 'Neha',
          email: 'neha@couple.app',
          password_hash: hashedPassword
        }
      ]);
      console.log('Users seeded successfully');
    } else {
      console.log('Users already exist');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
