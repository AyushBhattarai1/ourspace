import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import User from './models/User.js';
import Entry from './models/Entry.js';
import { generateToken, verifyToken } from './auth.js';
import { upload, isCloudinaryConfigured } from './cloudinary.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*'
    : '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
connectDB();

// Log storage configuration
console.log(`File storage: ${isCloudinaryConfigured() ? 'Cloudinary' : 'Local filesystem'}`);

// Auth routes
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email
    });
    
    res.json({ 
      token, 
      user: { 
        id: user._id.toString(), 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// Get partner info
app.get('/api/partner', verifyToken, async (req, res) => {
  try {
    const partner = await User.findOne({ _id: { $ne: req.user.id } }).select('_id name email');
    res.json({ 
      partner: {
        id: partner._id.toString(),
        name: partner.name,
        email: partner.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Entries routes
app.get('/api/entries', verifyToken, async (req, res) => {
  try {
    const { mode, type } = req.query;
    let query = {};
    
    if (mode === 'me') {
      // Show all content created by the user (private, shared with partner, and couple)
      query = { author_id: req.user.id };
    } else if (mode === 'partner') {
      // Show content the partner wrote for the user
      const partner = await User.findOne({ _id: { $ne: req.user.id } });
      query = { author_id: partner._id, visibility: 'for_partner' };
    } else if (mode === 'couple') {
      // Show all couple content from both users
      query = { visibility: 'couple' };
    }
    
    if (type) {
      query.type = type;
    }
    
    const entries = await Entry.find(query).sort({ createdAt: -1 });
    
    // Convert MongoDB documents to plain objects with id field
    const formattedEntries = entries.map(entry => ({
      id: entry._id.toString(),
      type: entry.type,
      author_id: entry.author_id.toString(),
      visibility: entry.visibility,
      title: entry.title,
      body: entry.body,
      tags: entry.tags,
      photos: entry.photos,
      entry_date: entry.entry_date,
      created_at: entry.createdAt,
      updated_at: entry.updatedAt
    }));
    
    res.json({ entries: formattedEntries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/entries', verifyToken, async (req, res) => {
  try {
    const { type, visibility, title, body, tags, photos, entry_date } = req.body;
    
    const entry = await Entry.create({
      type,
      author_id: req.user.id,
      visibility,
      title,
      body,
      tags,
      photos,
      entry_date: entry_date || new Date()
    });
    
    res.json({ 
      entry: {
        id: entry._id.toString(),
        type: entry.type,
        author_id: entry.author_id.toString(),
        visibility: entry.visibility,
        title: entry.title,
        body: entry.body,
        tags: entry.tags,
        photos: entry.photos,
        entry_date: entry.entry_date,
        created_at: entry.createdAt,
        updated_at: entry.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/entries/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, tags, photos, visibility } = req.body;
    
    const entry = await Entry.findById(id);
    
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    
    // Only the author can edit their own content
    if (entry.author_id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own content' });
    }
    
    entry.title = title;
    entry.body = body;
    entry.tags = tags;
    entry.photos = photos;
    entry.visibility = visibility;
    
    await entry.save();
    
    res.json({ 
      entry: {
        id: entry._id.toString(),
        type: entry.type,
        author_id: entry.author_id.toString(),
        visibility: entry.visibility,
        title: entry.title,
        body: entry.body,
        tags: entry.tags,
        photos: entry.photos,
        entry_date: entry.entry_date,
        created_at: entry.createdAt,
        updated_at: entry.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/entries/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const entry = await Entry.findById(id);
    
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    
    // Only the author can delete their own content
    if (entry.author_id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own content' });
    }
    
    await Entry.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Upload photo
app.post('/api/upload', verifyToken, upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Return URL based on storage type
  const url = isCloudinaryConfigured() 
    ? req.file.path  // Cloudinary URL
    : `/uploads/${req.file.filename}`; // Local URL
  
  res.json({ url });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export for serverless
export default app;
