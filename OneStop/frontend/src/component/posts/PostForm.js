import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, topics }) => {
  const [text, setText] = useState('');
  const [topic, setTopic] = useState(null);

  const onChange = (e) =>
  setText(e.target.value);


  const onSubmit = async (e) => {
    e.preventDefault();
    addPost({ text, topic });
    setText('');
  };

  return (
    
    <div className='post-form dashbox bordrr'>

      <p className="postext">
        <i className="fas fa-user" /> Ask a Question
      </p> 
      <form className='form my-1' onSubmit={onSubmit}>
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a post'
          name="text"
          value={text}
          onChange={onChange}
          required
        />
        <div className='space'></div>
        <p className="postext "> Choose the related Topic:</p>
        <select className='dropdown' name="topics" id="topics" onChange={(e) => {console.log(e.target.value);setTopic(e.target.value);}}>
          <option className='dropdown-item'>Select</option>
          {topics.map( (topic) => (
            <option className='dropdown-item' key={topic._id} value={topic._id}>{topic.title}</option>
          ) )}
        </select>
        <div className='space'></div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
};

export default connect(null,{ addPost })(PostForm);
