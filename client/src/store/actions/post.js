import Axios from 'axios';
import {
  GET_POSTS_START,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  UPDATE_LIKES,
  UPDATE_LIKES_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_START,
  ADD_POST_START,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  GET_POST_START,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  REMOVE_COMMENT_START,
  REMOVE_COMMENT_ERROR,
  REMOVE_COMMENT_SUCCESS
} from './actionTypes';

import { setAlert } from './alert';

const getPostsStart = () => {
  return {
    type: GET_POSTS_START
  };
};

const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    posts
  };
};

const getPostsError = (error) => {
  return {
    type: GET_POSTS_ERROR,
    error
  };
};

const getPostStart = () => {
  return {
    type: GET_POST_START
  };
};

const getPostSuccess = (post) => {
  return {
    type: GET_POST_SUCCESS,
    post
  };
};

const getPostError = (error) => {
  return {
    type: GET_POST_ERROR,
    error
  };
};

const updateLikes = (likedPost) => {
  return {
    type: UPDATE_LIKES,
    likedPost
  };
};

const updateLikesError = (error) => {
  return {
    type: UPDATE_LIKES_ERROR,
    error
  };
};

const deletePostStart = (postId) => {
  return {
    type: DELETE_POST_START,
    postId
  };
};

const deletePostSuccess = (postId) => {
  return {
    type: DELETE_POST_SUCCESS,
    postId
  };
};

const deletePostError = (error) => {
  return {
    type: DELETE_POST_ERROR,
    error
  };
};

const addPostStart = () => {
  return {
    type: ADD_POST_START
  };
};

const addPostSuccess = (post) => {
  return {
    type: ADD_POST_SUCCESS,
    post
  };
};

const addPostError = (error) => {
  return {
    type: ADD_POST_ERROR,
    error
  };
};

const addCommentStart = () => {
  return {
    type: ADD_COMMENT_START
  };
};

const addCommentSuccess = (post) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    post
  };
};

const addCommentError = (error) => {
  return {
    type: ADD_COMMENT_ERROR,
    error
  };
};

const removeCommentStart = (commentId) => {
  return {
    type: REMOVE_COMMENT_START,
    commentId
  };
};

const removeCommentSuccess = (post) => {
  return {
    type: REMOVE_COMMENT_SUCCESS,
    post
  };
};

const removeCommentError = (error) => {
  return {
    type: REMOVE_COMMENT_ERROR,
    error
  };
};

export const getPosts = () => async (dispatch) => {
  dispatch(getPostsStart());
  try {
    const response = await Axios.get('/api/posts');
    dispatch(getPostsSuccess(response.data.posts));
  } catch (error) {
    const response = error.response.data;
    dispatch(getPostsError(response));
  }
};

export const getPost = (_id) => async (dispatch) => {
  dispatch(getPostStart());
  try {
    const response = await Axios.get(`/api/posts/${_id}`);
    dispatch(getPostSuccess(response.data.post));
  } catch (error) {
    const response = error.response.data;
    dispatch(getPostError(response));
  }
};

export const addComment = (postId, text) => async (dispatch) => {
  dispatch(addCommentStart());
  try {
    const response = await Axios.put(`/api/posts/comments/${postId}`, { text });
    dispatch(addCommentSuccess(response.data.post));
    dispatch(setAlert('Comment added', 'success'));
  } catch (error) {
    dispatch(addCommentError(error.response.data));
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  dispatch(removeCommentStart(commentId));
  try {
    const response = await Axios.delete(
      `/api/posts/comments/${postId}/${commentId}`
    );
    dispatch(removeCommentSuccess(response.data.post));
    dispatch(setAlert('Comment removed', 'success'));
  } catch (error) {
    dispatch(removeCommentError(error.response.data));
  }
};

export const like = (postId) => async (dispatch) => {
  try {
    const response = await Axios.put(`/api/posts/like/${postId}`);
    dispatch(updateLikes(response.data.post));
  } catch (error) {
    dispatch(updateLikesError(error.response.data));
  }
};

export const unlike = (postId) => async (dispatch) => {
  try {
    const response = await Axios.put(`/api/posts/unlike/${postId}`);
    dispatch(updateLikes(response.data.post));
  } catch (error) {
    dispatch(updateLikesError(error.response.data));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch(deletePostStart(postId));
  try {
    await Axios.delete(`/api/posts/${postId}`);
    dispatch(deletePostSuccess(postId));
    dispatch(setAlert('Post removed', 'success'));
  } catch (error) {
    dispatch(deletePostError(error.response.data));
  }
};

export const addPost = (post) => async (dispatch) => {
  dispatch(addPostStart());
  try {
    const response = await Axios.post('/api/posts', post);
    dispatch(addPostSuccess(response.data.post));
  } catch (error) {
    const response = error.response.data;
    dispatch(addPostError(response));
  }
};
