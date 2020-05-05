import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/post';
import Spinner from '../UI/Spinner/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Link } from 'react-router-dom';

const Post = ({ getPost, match, post, loading }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return !loading && post ? (
    <Fragment>
      <Link to='/posts' className='btn btn-primary'>
        Go back
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} postId={post._id} comment={comment} />
        ))}
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post.getPost.post,
  loading: state.post.getPost.loading
});

export default connect(mapStateToProps, { getPost })(Post);
