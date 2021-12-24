const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Loading middlewares
const checkObjectId = require('../../middleware/checkObjectId');
const auth = require('../../middleware/auth');

// Load Profile Model
const Post = require('../../models/Post');
// Load User Model
const User = require('../../models/User');
// Load Topic Model
const Topic = require('../../models/Topic');
const Profile = require('../../models/Profile');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      // console.log(req.body.topic);
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        topic: req.body.topic
      });

      const post = await newPost.save();
      post.populate('topic', ['title']);
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {

    // sorted post by descending order of posting date
    const posts = await Post.find().sort({ date: -1 }).populate('topic', ['title']);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id',
   auth, 
   checkObjectId('id'), 
   async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    post.populate('topic', ['title']);
    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', 
    auth, 
    checkObjectId('id'),
    async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);

        if (!post) {
          return res.status(404).json({ msg: 'Post not found' });
        }

      // Check user that one who created is deleting
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      await post.remove();

      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put(
  '/like/:id', 
  auth, 
  checkObjectId('id'), 
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked
      // some is the array method in JS
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put(
  '/unlike/:id',
   auth, 
   checkObjectId('id'), 
   async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has not yet been liked
      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
   
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await post.save();

      return res.json(post.likes);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


/**
 * @route   PUT api/posts/topics/follow/:id
 * @desc    follow a topic
 * @access  private
 */
 router.put(
  '/topics/follow/:id', 
  auth, 
  checkObjectId('id'), 
  async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id);
      const profile = await Profile.findOne({user: req.user.id});
      // Check if the topic has already been followed
      // some is the array method in JS
      if(!topic || !profile){
        return res.status(400).json({ msg: 'topic or profile not found' });
      }
      // console.log(topic.followers);
      if(!profile.followed_topics){
        profile.followed_topics = [];
      }
      // console.log(profile.followed_topics);
      const inTopic = topic.followers.some((follower) => follower.user.toString() === req.user.id);
      const inProfile = profile.followed_topics.some((followed) => followed.topic.toString() === req.params.id);
      // console.log(inProfile);
      if (inTopic && inProfile) {
        return res.status(400).json({ msg: 'topic already followed' });
      }
      else if(inTopic || inProfile){
        topic.followers = topic.followers.filter(
          ({ user }) => user.toString() !== req.user.id
        );
        profile.followed_topics = profile.followed_topics.filter((followed_topic) => followed_topic.topic.toString() !== req.params.id);
        // return res.status(400).json({ msg: 'continuity error' });
      }

      topic.followers.unshift({ user: req.user.id });
      profile.followed_topics.unshift({topic: topic._id});
      await topic.save();
      await profile.save();

      return res.json(topic.followers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

/**
 * @route   PUT api/posts/topics/unfollow/:id
 * @desc    unfollow topic
 * @access  private
 */
 router.put(
  '/topics/unfollow/:id',
   auth, 
   checkObjectId('id'), 
   async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id);
      const profile = await Profile.findOne({user: req.user.id});
      // Check if the topic has already been followed
      // some is the array method in JS
      if(!topic || !profile){
        return res.status(400).json({ msg: 'topic or profile not found' });
      }
      if(!profile.followed_topics){
        profile.followed_topics = [];
      }
      const inTopic = topic.followers.some((follower) => follower.user.toString() === req.user.id);
      const inProfile = profile.followed_topics.some((followed) => followed.topic.toString() === req.params.id);
      // Check if the topic has not yet been followed
      if (!inTopic && !inProfile) {
        return res.status(400).json({ msg: 'topic has not yet been followed' });
      }
   
      topic.followers = topic.followers.filter(
        ({ user }) => user.toString() !== req.user.id
      );
      // console.log(profile.followed_topics);
      profile.followed_topics = profile.followed_topics.filter((followed_topic) => followed_topic.topic.toString() !== req.params.id);


      await topic.save();
      await profile.save();

      return res.json(topic.followers);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});



// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private

// id here is the ID of post on which we want to comment 
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete(
  '/comment/:id/:comment_id', 
  auth, 
  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user is same one who made it 
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  }
   catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/posts/comment/upvote/:id/:comment_id
 * @desc    upvote a comment
 * @access  private
 */
router.put("/comment/upvote/:id/:comment_id", auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).send("Post does not exist");
    }
    for(let i=0;i<post.comments.length;i++){
      if(req.params.comment_id === post.comments[i]._id){
        // check if downvoted
        if(post.comments[i].downvotes.some((downvote) => downvote.user.toString() === req.user.id)){
          post.comments[i].downvotes = post.comments[i].downvotes.filter((downvote) => downvote.user.toString() !== req.user.id);
        }
        // check if not already upvoted
        if(!post.comments[i].upvotes.some((upvote) => upvote.user.toString() === req.user.id)){
          post.comments[i].upvotes.unshift({ user: req.user.id});
        }
        return res.json({upvotes: post.comments[i].upvotes, downvotes: post.comments[i].downvotes});
      }
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});


/**
 * @route   POST api/posts/comment/unupvote/:id/:comment_id
 * @desc    remove upvote from a comment
 * @access  private
 */
router.put("/comment/unupvote/:id/:comment_id", auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).send("Post does not exist");
    }
    for(let i=0;i<post.comments.length;i++){
      if(req.params.comment_id === post.comments[i]._id){

        // check if already upvoted
        if(post.comments[i].upvotes.some((upvote) => upvote.user.toString() === req.user.id)){
          post.comments[i].upvotes.filter((upvote) => upvote.user.toString() !== req.user.id);
        }
        return res.json({upvotes: post.comments[i].upvotes, downvotes: post.comments[i].downvotes});
      }
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});



/**
 * @route   POST api/posts/comment/downvote/:id/:comment_id
 * @desc    downvote a comment
 * @access  private
 */
 router.put("/comment/downvote/:id/:comment_id", auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).send("Post does not exist");
    }
    for(let i=0;i<post.comments.length;i++){
      if(req.params.comment_id === post.comments[i]._id){
        // check if upvoted
        if(post.comments[i].upvotes.some((upvote) => upvote.user.toString() === req.user.id)){
          post.comments[i].upvotes = post.comments[i].upvotes.filter((upvote) => upvote.user.toString() !== req.user.id);
        }
        // check if not already downvoted
        if(!post.comments[i].downvotes.some((downvote) => downvote.user.toString() === req.user.id)){
          post.comments[i].downvotes.unshift({ user: req.user.id});
        }
        return res.json({upvotes: post.comments[i].upvotes, downvotes: post.comments[i].downvotes});
      }
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

/**
 * @route   POST api/posts/comment/undownvote/:id/:comment_id
 * @desc    remove downvote from comment
 * @access  private
 */
router.put("/comment/undownvote/:id/:comment_id", auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).send("Post does not exist");
    }
    for(let i=0;i<post.comments.length;i++){
      if(req.params.comment_id === post.comments[i]._id){

        // check if already downvoted
        if(post.comments[i].downvotes.some((downvote) => downvote.user.toString() === req.user.id)){
          post.comments[i].downvotes.filter((downvote) => downvote.user.toString() !== req.user.id);
        }
        return res.json({upvotes: post.comments[i].upvotes, downvotes: post.comments[i].downvotes});
      }
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});




/**
 * @route   POST api/posts/topics
 * @desc    create topics
 * @access  private
 */
router.post('/topics', auth, check('topics', 'Array expected').notEmpty() , async (req, res) => {
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  try {
    const {topics} = req.body;
    const tps = topics.split(',').map(topic => topic.trim());
    for(let i=0;i<tps.length;i++){
      const topicField = {title: tps[i]};
      const ftopic = await Topic.find({title: topicField.title});
      console.log(ftopic.length, tps[i]);
      if(ftopic.length == 0){
        const tp = new Topic(topicField);
        await tp.save();
      }
    }
    const topicAll = await Topic.find();
    res.json(topicAll);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/posts/all/topics
 * @desc    get topics
 * @access  public
 */
router.get("/all/topics", async (req, res) => {
  try {
    const topics = await Topic.find().sort({title: 1});
    // console.log(topics);
    res.json(topics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
