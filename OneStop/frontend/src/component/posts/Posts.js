import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { getTopics } from '../../actions/topic';

const Posts = ({ getPosts, getTopics, post: { posts }, topic: {topics} }) => {
  useEffect(() => {
    getPosts();
    getTopics();
  }, [getPosts, getTopics]);

  return (
    <Fragment>
      <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm topics={topics} />
      <div className="posts">
        {posts.map((post) => (
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
