import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['journal', 'note', 'moment', 'gallery', 'mind']
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visibility: {
    type: String,
    required: true,
    enum: ['only_me', 'for_partner', 'couple']
  },
  title: {
    type: String,
    maxlength: 255
  },
  body: {
    type: String
  },
  tags: [{
    type: String
  }],
  photos: [{
    type: String
  }],
  entry_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

entrySchema.index({ author_id: 1 });
entrySchema.index({ type: 1 });
entrySchema.index({ visibility: 1 });

export default mongoose.model('Entry', entrySchema);
