import {
  GET_POSTS_START,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  UPDATE_LIKES,
  UPDATE_LIKES_ERROR,
  DELETE_POST_ERROR,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
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
} from '../actions/actionTypes';

const initialState = {
  addPost: {
    loading: false,
    error: null
  },
  getPost: {
    post: null,
    loading: false,
    error: null
  },
  getPosts: {
    posts: null,
    loading: false,
    error: null
  },
  deletePost: {
    postId: null,
    loading: false,
    error: null
  },
  addComment: {
    error: null,
    loading: false
  },
  removeComment: {
    error: null,
    loading: false,
    commentId: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_START:
      return getPostsStart(state);
    case GET_POST_START:
      return getPostStart(state);
    case ADD_POST_START:
      return addPostStart(state);
    case ADD_POST_SUCCESS:
      return addPostSuccess(state, action.post);
    case ADD_POST_ERROR:
      return addPostError(state, action.error);
    case ADD_COMMENT_START:
      return addCommentStart(state);
    case ADD_COMMENT_SUCCESS:
      return addCommentSuccess(state, action.post);
    case ADD_COMMENT_ERROR:
      return addCommentError(state, action.error);
    case REMOVE_COMMENT_START:
      return removeCommentStart(state, action.commentId);
    case REMOVE_COMMENT_SUCCESS:
      return removeCommentSuccess(state, action.post);
    case REMOVE_COMMENT_ERROR:
      return removeCommentError(state, action.error);
    case DELETE_POST_START:
      return deletePostStart(state, action.postId);
    case GET_POSTS_SUCCESS:
      return getPostsSuccess(state, action.posts);
    case GET_POST_SUCCESS:
      return getPostSuccess(state, action.post);
    case DELETE_POST_SUCCESS:
      return deletePostSuccess(state, action.postId);
    case GET_POSTS_ERROR:
    case UPDATE_LIKES_ERROR:
      return getPostsError(state, action.error);
    case GET_POST_ERROR:
      return getPostError(state, action.error);
    case DELETE_POST_ERROR:
      return deletePostError(state, action.error);
    case UPDATE_LIKES:
      return updateLikes(state, action.likedPost);
    default:
      return state;
  }
};

const getPostsStart = (state) => {
  return {
    ...state,
    getPosts: {
      ...state.getPosts,
      loading: true,
      error: null
    }
  };
};

const getPostsSuccess = (state, posts) => {
  return {
    ...state,
    getPosts: {
      ...state.getPosts,
      loading: false,
      posts
    }
  };
};

const getPostsError = (state, error) => {
  return {
    ...state,
    getPosts: {
      ...state.getPosts,
      loading: false,
      error
    }
  };
};

const getPostStart = (state) => {
  return {
    ...state,
    getPost: {
      post: null,
      loading: true,
      error: null
    }
  };
};

const getPostSuccess = (state, post) => {
  return {
    ...state,
    getPost: {
      ...state.getPost,
      loading: false,
      post
    }
  };
};

const getPostError = (state, error) => {
  return {
    ...state,
    getPost: {
      ...state.getPost,
      loading: false,
      error
    }
  };
};

const updateLikes = (state, likedPost) => {
  return {
    ...state,
    getPosts: {
      ...state.getPosts,
      posts: state.getPosts.posts.map((post) => {
        return post._id === likedPost._id
          ? { ...post, likes: likedPost.likes }
          : post;
      })
    }
  };
};

const deletePostStart = (state, postId) => {
  return {
    ...state,
    deletePost: {
      loading: true,
      postId,
      error: null
    }
  };
};

const deletePostSuccess = (state, postId) => {
  return {
    ...state,
    deletePost: {
      ...state.deletePost,
      loading: false,
      postId: null
    },
    getPosts: {
      ...state.getPosts,
      posts: state.getPosts.posts.filter((post) => post._id !== postId)
    }
  };
};

const deletePostError = (state, error) => {
  return {
    ...state,
    deletePost: {
      ...state.deletePost,
      loading: false,
      error
    }
  };
};

const addPostStart = (state) => {
  return {
    ...state,
    addPost: {
      ...state.addPost,
      loading: true
    }
  };
};

const addPostSuccess = (state, post) => {
  return {
    ...state,
    addPost: {
      ...state.addPost,
      loading: false
    },
    getPosts: {
      ...state.getPosts,
      posts: [post, ...state.getPosts.posts]
    }
  };
};

const addPostError = (state, error) => {
  return {
    ...state,
    addPost: {
      ...state.addPost,
      loading: false,
      error
    }
  };
};

const addCommentStart = (state) => {
  return {
    ...state,
    addComment: {
      loading: true,
      error: null
    }
  };
};

const addCommentSuccess = (state, post) => {
  return {
    ...state,
    addComment: {
      ...state.addComment,
      loading: false
    },
    getPost: {
      ...state.getPost,
      post
    }
  };
};

const addCommentError = (state, error) => {
  return {
    ...state,
    addComment: {
      ...state.addComment,
      error
    }
  };
};

const removeCommentStart = (state, commentId) => {
  return {
    ...state,
    removeComment: {
      loading: true,
      error: null,
      commentId
    }
  };
};

const removeCommentSuccess = (state, post) => {
  return {
    ...state,
    removeComment: {
      ...state.removeComment,
      loading: false,
      commentId: null
    },
    getPost: {
      ...state.getPost,
      post
    }
  };
};

const removeCommentError = (state, error) => {
  return {
    ...state,
    removeComment: {
      ...state.removeComment,
      error
    }
  };
};
