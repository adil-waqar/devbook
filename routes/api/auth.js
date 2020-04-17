const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middlewares/auth');
const AuthService = require('./../../services/auth');
const UserService = require('./../../services/user');

// @route   GET /api/auth
// @desc    Get authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const userServiceInstance = new UserService();
    const user = await userServiceInstance.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth
// @desc    Login route
// @access  Public
router.post(
  '/',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      // Check if user exists
      const authServiceInstance = new AuthService();
      const response = await authServiceInstance.login(email, password);
      if (response.errors)
        return res
          .status(response.statusCode)
          .json({ errors: response.errors });
      // Return token
      res.status(response.statusCode).json({ token: response.token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: error.message });
    }
  }
);

module.exports = router;
