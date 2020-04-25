const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');
const handleError = require('../../utils/errorHandler');
const PostService = require('../../services/post');

// @route   POST /api/posts
// @desc    Add a route
// @access  Private
router.post(
  '/',
  auth,
  [check('text', 'Text is required').exists({ checkFalsy: true })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(500).json({ errors: errors.array() });
      const postServiceInstance = new PostService();
      const { text } = req.body;
      const userId = req.user.id;
      const response = await postServiceInstance.create(text, userId);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      handleError(error, res);
    }
  }
);

// @route   GET /api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const postServiceInstance = new PostService();
    const response = await postServiceInstance.getAll();
    return res.status(response.statusCode).json(response);
  } catch (error) {
    handleError(error, res);
  }
});

// @route   GET /api/posts/postId
// @desc    Get a post by Id
// @access  Private
router.get('/:postId', auth, async (req, res) => {
  try {
    const postServiceInstance = new PostService();
    const response = await postServiceInstance.findById(req.params.postId);
    res.status(response.statusCode).json(response);
  } catch (error) {
    if (error.name === 'CastError') {
      console.log(error);
      return res.status(404).json({ msg: 'Post not found' });
    }
    handleError(error, res);
  }
});

// @route   Delete /api/posts/postId
// @desc    Delete a post by Id
// @access  Private
router.delete('/:postId', auth, async (req, res) => {
  try {
    const postServiceInstance = new PostService();
    const userId = req.user.id;
    const postId = req.params.postId;
    const response = await postServiceInstance.deleteById(postId, userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error.name === 'CastError') {
      console.log(error);
      return res.status(404).json({ msg: 'Post not found' });
    }
    handleError(error, res);
  }
});

// @route   PUT /api/posts/like/:postId
// @desc    Like a post
// @access  Private
router.put('/like/:postId', auth, async (req, res) => {
  try {
    const postServiceInstance = new PostService();
    const postId = req.params.postId;
    const userId = req.user.id;
    const response = await postServiceInstance.like(postId, userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error.name === 'CastError') {
      console.error(error);
      return res.status(404).json({ msg: 'Post not found' });
    }
    handleError(error, res);
  }
});

// @route   PUT /api/posts/unlike/:postId
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:postId', auth, async (req, res) => {
  try {
    const postServiceInstance = new PostService();
    const postId = req.params.postId;
    const userId = req.user.id;
    const response = await postServiceInstance.unlike(postId, userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error.name === 'CastError') {
      console.error(error);
      return res.status(404).json({ msg: 'Post not found' });
    }
    handleError(error, res);
  }
});

// @route   PUT /api/posts/comments/:postId
// @desc    Comment on a post
// @access  Private
router.put(
  '/comments/:postId',
  auth,
  [check('text', 'Text is required').exists({ checkFalsy: true })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(500).json({ errors: errors.array() });
      const postServiceInstance = new PostService();
      const { text } = req.body;
      const userId = req.user.id;
      const postId = req.params.postId;
      const response = await postServiceInstance.comment(text, userId, postId);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.delete('/comments/:postId/:commentId', auth, async (req, res) => {
  try {
    const postServiceInstance = new PostService();
    const userId = req.user.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const response = await postServiceInstance.deleteComment(
      userId,
      postId,
      commentId
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
