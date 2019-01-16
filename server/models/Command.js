import mongoose from 'mongoose';

const CommandSchema = {
  snippet: {
    type: String,
    allowNull: false,
    trim: true,
  },
  action: {
    type: String,
    allowNull: false,
    trim: true,
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
};

const Command = mongoose.model('Command', CommandSchema, 'commands');

export default Command;
