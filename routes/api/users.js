const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const AuthService = require('../../services/auth');

// @route   POST /api/users
// @desc    Create a user
// @access  public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Enter a password of minimum 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      // Check if body is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      // Instantiate UserService
      const authServiceInstance = new AuthService();
      const response = await authServiceInstance.signUp(name, email, password);
      // Send response
      if (response.errors)
        return res
          .status(response.statusCode)
          .json({ errors: response.errors });
      res.status(response.statusCode).json({ token: response.token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
