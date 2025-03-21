const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String,  unique: true },
  password: { type: String, required: true },
  username : { type: String, required: true, unique: true },
  fullName : { type: String},
  phoneNumber : { type: String},
  address : { type: String},
  avatar : { type: String},
  role: { type: String, default: 'user' },
  status: { type: String, default: 'active' },
  refreshToken : { type: String, default: '' },
}, {
  timestamps: true,
});

const User = mongoose.model('users', userSchema);

module.exports = User;
