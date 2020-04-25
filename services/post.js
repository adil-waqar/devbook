const Post = require('../models/Post');
const User = require('../models/User');

class PostService {
  create = async (text, userId) => {
    // Find user
    const user = await User.findById(userId);
    if (!user) return { statusCode: 404, msg: 'User not found' };
    const post = new Post({
      text,
      user: user.id,
      name: user.name,
      avatar: user.avatar
    });
    const res = await post.save();
    return { statusCode: 200, post: res };
  };

  getAll = async () => {
    const posts = await Post.find().sort({ date: -1 });
    return { statusCode: 200, posts };
  };

  findById = async (id) => {
    const post = await Post.findById(id);
    if (!post) return { statusCode: 404, msg: 'Post not found' };
    return { statusCode: 200, post };
  };

  deleteById = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) return { statusCode: 404, msg: 'Post not found' };
    if (post.user.toString() !== userId)
      return { statusCode: 401, msg: 'User not authorized' };
    await post.remove();
    return { statusCode: 200, msg: 'Post removed' };
  };

  like = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) return { statusCode: 404, msg: 'Post not found' };
    // Check if post already liked
    const liked = post.likes.find((item) => item.user.toString() === userId);
    if (liked) return { statusCode: 400, msg: 'Post already liked' };
    post.likes.unshift({ user: userId });
    const res = await post.save();
    return { statusCode: 200, post: res };
  };

  unlike = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) return { statusCode: 404, msg: 'Post not found' };
    const delIndex = post.likes
      .map((item) => item.user.toString())
      .indexOf(userId);
    if (delIndex === -1)
      return { statusCode: 400, msg: 'Post already unliked' };
    post.likes.splice(delIndex, 1);
    const res = await post.save();
    return { statusCode: 200, post: res };
  };

  comment = async (text, userId, postId) => {
    const user = await User.findById(userId);
    if (!user) return { statusCode: 404, msg: 'User not found' };
    const post = await Post.findById(postId);
    if (!post) return { statusCode: 404, msg: 'Post not found' };
    const comment = {
      text,
      user: user.id,
      name: user.name,
      avatar: user.avatar
    };
    post.comments.unshift(comment);
    const res = await post.save();
    return { statusCode: 200, post: res };
  };

  deleteComment = async (userId, postId, commentId) => {
    const user = await User.findById(userId);
    if (!user) return { statusCode: 404, msg: 'User not found' };
    const post = await Post.findById(postId);
    if (!post) return { statusCode: 404, msg: 'Post not found' };
    const delIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(commentId);
    if (delIndex === -1) return { statusCode: 404, msg: 'Comment not found' };
    // Check authorization
    if (post.comments[delIndex].user.toString() !== userId)
      return { statusCode: 401, msg: 'User not authorized' };
    post.comments.splice(delIndex, 1);
    const res = await post.save();
    return { statusCode: 200, post: res };
  };
}

module.exports = PostService;
