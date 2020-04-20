const mongoose = require('mongoose');
const Profile = require('./Profile');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre('deleteOne', async function () {
  try {
    await Profile.deleteOne({ user: this._conditions._id }).exec();
    // @todo - Also delete posts
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = User = mongoose.model('user', UserSchema);
