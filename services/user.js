const User = require('../models/User');

class UserService {
  findById = async (id) => {
    return await User.findById(id).select('-password');
  };

  deleteById = async (id) => {
    const user = await User.deleteOne({ _id: id });
    if (user) return { statusCode: 200, msg: 'User deleted successfully' };
    return { statusCode: 400, msg: 'User does not exist' };
  };
}

module.exports = UserService;
