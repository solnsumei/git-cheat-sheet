import mongoose from 'mongoose';

const CommandSchema = mongoose.Schema({
  snippet: {
    type: String,
    allowNull: false,
    trim: true,
    text: true
  },
  action: {
    type: String,
    allowNull: false,
    trim: true,
    text: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    allowNull: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    allowNull: false
  }
});

CommandSchema.index({ snippet: 'text', action: 'text' });

const Command = mongoose.model('Command', CommandSchema, 'commands');

export default Command;
