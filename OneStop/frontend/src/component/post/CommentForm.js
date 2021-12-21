import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import MDEditor from '@uiw/react-md-editor';

const CommentForm = ({ postId, addComment }) => {
  const str = `Type your answer here`;
  const [text, setText] = useState(str);

  // const onChange = (e) => setText(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(text);
    addComment(postId, { text });
    setText('');
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Write your Answer</h3>
      </div>
      <form className='form my-1' onSubmit={onSubmit} >
        {/* <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          value={text}
          onChange={onChange}
          required
        /> */}
        <MDEditor value={text} onChange={setText} />

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null,{ addComment })(CommentForm);
