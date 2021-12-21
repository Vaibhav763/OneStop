import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { getTopics } from '../../actions/topic';
import Spinner from '../layout/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


const Posts = ({ getPosts, getTopics, post: { posts, loading }, topic: {topics} }) => {
  const [filteredPosts, setPosts] = useState(posts);
  const [text, setText] = useState('');
  useEffect(() => {
    getPosts();
    getTopics();
  }, [getPosts, getTopics]);

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
      <section className="container">
      <h1 className="large text-primary">Questions</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm topics={topics} />
      <hr />
      <div className="posts">
        <div className="container mt-2">
            <form onSubmit={onSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search post"
                  aria-label="Search post"
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
        {filteredPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      </section>
    </Fragment>
  );
};


Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getTopics: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  topic: state.topic
});

export default connect(mapStateToProps, { getPosts, getTopics })(Posts);
