const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// @route   GET /api/users
// @desc    Test route
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        console.log(user);
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
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
      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      });
      res.status(201).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
);

module.exports = router;
