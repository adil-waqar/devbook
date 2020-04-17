const User = require('../models/User');

class UserService {
  findById = async (id) => {
    return await User.findById(id).select('-password');
  };
}

module.exports = UserService;
