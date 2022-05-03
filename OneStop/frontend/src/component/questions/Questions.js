import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
// import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
// import { getTopics } from '../../actions/topic';
import Spinner from '../layout/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


const Questions = ({ getPosts, post: { posts, loading } }) => {
  const [filteredPosts, setPosts] = useState(posts);
  const [text, setText] = useState('');
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    setPosts(posts);
    // console.log("twice");
  }, [posts]);

  const onChange = (e) => {
    setText(e.target.value.toLowerCase());
  }
  const onSubmit = (e) => {
    e.preventDefault()
    loading = true;
    // const profiles2 = profiles;
    setPosts(posts.filter((post) => {
      const keywords = text.split(" ").map(keyword => keyword.trim());
      keywords.filter(keyword => keyword.length > 0);
      let inQuestion=true;
      let inTopic = false;
      for(let i = 0;i<keywords.length;i++){
        if(!post.text.toLowerCase().includes(keywords[i])){
          inQuestion = false;
          break;
        }
      }
      if(post.topic && post.topic.title.toLowerCase().includes(text))
        inTopic = true;
      return (inQuestion || inTopic);
    }));

    // console.log(filteredPosts);
    loading = false;
  }


  return loading ? <Spinner/> : (
    <Fragment>
      <section className="container ">
      <h1 className="large middle">Questions</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <div className="posts">
        <div className="container mt-2  dashbox bordrr">
          <p className='text'>
            Get your doubts answered -: 
          </p>
            <form onSubmit={onSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search question"
                  aria-label="Search question"
                  aria-describedby="basic-addon2"
                  value={text}
                  onChange={onChange}
                />
                <Button type='submit' variant="outline-secondary" id="button-addon2">
                  Filter
                </Button>
              </InputGroup>
            </form>
          </div>
          
          <div className='dashbox bordrr'>
          <p className='text'>
            Previously Asked Question-: 
          </p>
        {filteredPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
        </div>
      </div>
      </section>
    </Fragment>
  );
};


Questions.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Questions);
