const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');
const ProfileService = require('../../services/profile');

// @route   GET /api/profile/me
// @desc    Get your profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profileServiceInstance = new ProfileService();
    const userId = req.user.id;
    const response = await profileServiceInstance.findByUserId(userId);
    if (!response.profile)
      return res.status(response.statusCode).json({ msg: response.msg });
    res.status(response.statusCode).json({ profile: response.profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: error.message });
  }
});

// @route   POST /api/profile
// @desc    Create or update your profile
// @access  Private
router.post(
  '/',
  auth,
  [
    check('status', 'Status is required').exists(),
    check('skills', 'Skills are required and should be an array')
      .exists()
      .isArray()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const profileServiceInstance = new ProfileService();
      const data = req.body;
      const userId = req.user.id;
      const response = await profileServiceInstance.createOrUpdate(
        data,
        userId
      );
      res.status(response.statusCode).json({ profile: response.profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: error.message });
    }
  }
);

module.exports = router;
