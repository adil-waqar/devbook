const User = require('../models/User');

class UserService {
  findById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) return { statusCode: 404, msg: 'User not found' };
    else return { statusCode: 200, user };
  };

  deleteById = async (id) => {
    const user = await User.deleteOne({ _id: id });
    if (user) return { statusCode: 200, msg: 'User deleted successfully' };
    return { statusCode: 400, msg: 'User does not exist' };
  };
}

module.exports = UserService;
