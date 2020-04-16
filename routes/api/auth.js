const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middlewares/auth');

// @route   GET /api/auth
// @desc    Test route
// @access  public
router.get('/', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
