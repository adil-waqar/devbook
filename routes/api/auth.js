const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middlewares/auth');
const AuthService = require('./../../services/auth');
const UserService = require('./../../services/user');
const handleError = require('../../utils/errorHandler');

// @route   GET /api/auth
// @desc    Get authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const userServiceInstance = new UserService();
    const response = await userServiceInstance.findById(id);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    handleError(error, res);
  }
});

// @route   POST /api/auth
// @desc    Login route
// @access  Public
router.post(
  '/',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists({ checkFalsy: true })
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
      handleError(error, res);
    }
  }
);

module.exports = router;
