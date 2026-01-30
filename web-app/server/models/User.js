const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
  isEmailConfirmed: { type: Boolean, default: false },
  emailConfirmationToken: { type: String },
  emailConfirmationTokenExpiry: { type: Date },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
