const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthService {
  signUp = async (name, email, password) => {
    let user = await User.findOne({ email });
    if (user) {
      return { statusCode: 400, errors: [{ msg: 'User already exists' }] };
    }
    // Get avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    // Create a new user
    user = new User({
      name,
      email,
      password,
      avatar
    });
    // Encrpyt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = this.generateJWT(payload);
    return {
      statusCode: 201,
      token
    };
  };

  login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user)
      return {
        statusCode: 401,
        errors: [{ msg: 'Invalid credentials' }]
      };
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return {
        statusCode: 401,
        errors: [{ msg: 'Invalid credentials' }]
      };
    // Prepare payload
    const payload = {
      user: {
        id: user.id
      }
    };
    // Sign a jwt
    const token = this.generateJWT(payload);
    return {
      statusCode: 200,
      token
    };
  };

  generateJWT = (payload) => {
    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: config.get('expiresIn')
    });
    return token;
  };
}

module.exports = AuthService;
