import mongoose from 'mongoose';

const UserSchema = {
  name: {
    type: String,
    allowNull: false,
    trim: true,
  },
  email: {
    type: String,
    allowNull: false,
    trim: true,
  },
  password: {
    type: String,
    allowNull: false
  },
  isAdmin: {
    type: Boolean,
    allowNull: false,
    default: false,
  },
  commands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Command'
  }]
};

const User = mongoose.model('User', UserSchema, 'users');

export default User;