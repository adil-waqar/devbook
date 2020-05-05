import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../store/actions/post';
import Spinner from '../UI/Spinner/Spinner';

const CommentForm = ({ postId, addComment, loading }) => {
  const [text, setText] = useState('');
  return !loading ? (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, text);
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  ) : (
    <Spinner />
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  loading: state.post.addComment.loading
});

export default connect(mapStateToProps, { addComment })(CommentForm);
