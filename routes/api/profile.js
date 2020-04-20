const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');
const ProfileService = require('../../services/profile');
const handleError = require('../../utils/errorHandler');

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
    handleError(error, res);
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
      handleError(error, res);
    }
  }
);

// @route   GET /api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (_, res) => {
  try {
    const profileServiceInstance = new ProfileService();
    const response = await profileServiceInstance.getAll();
    res.status(response.statusCode).json({ profiles: response.profiles });
  } catch (error) {
    handleError(error, res);
  }
});

// @route   GET /api/profile/user/:userId
// @desc    Geta profile by userId
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const profileServiceInstance = new ProfileService();
    const userId = req.params.userId;
    const response = await profileServiceInstance.findByUserId(userId);
    res.status(response.statusCode).json(response);
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(404).json({ msg: 'Profile not found' });
    handleError(error, res);
  }
});

module.exports = router;
