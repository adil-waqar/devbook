import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { removeComment } from '../../store/actions/post';
import Spinner from '../UI/Spinner/Spinner';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  removeComment,
  deleting,
  delCommentId
}) =>
  deleting && delCommentId === _id ? (
    <Spinner />
  ) : (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {user === auth.user._id && (
          <button
            onClick={() => removeComment(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  deleting: state.post.removeComment.loading,
  delCommentId: state.post.removeComment.commentId
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
