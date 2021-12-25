const express = require('express');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const request = require('request');

// Loading middlewares
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  


    // @route    POST api/profile
    // @desc     Create or update user profile
    // @access   Private

router.post(
    '/',
    auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  

     // destructure the request
      const {
        company,
        handle,
        location,
        bio,
        status,
        githubusername,
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        
       } = req.body;

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (handle) profileFields.handle = handle;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;

        // Skills - Spilt into array
        if (skills) {
        profileFields.skills =  Array.isArray(skills)
                                ? skills
                                : skills.split(',').map((skill) => ' ' + skill.trim())
        }
  
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
    }
  );

// @route    GET api/profile
// @desc     Get all profiles
// @access   Private
router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar', 'email']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

  
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Private
router.get(
    '/user/:user_id',
    checkObjectId('user_id'),
    async (req, res) => {
      try {
        const profile = await Profile.findOne({
          user: req.params.user_id
        }).populate('user', ['name', 'avatar']);
  
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });
  
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
);



// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
      // Remove profile
      // Remove user
      await Promise.all([
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  
// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private

router.put(
    '/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body;

      const newExp = {};
        if (title) newExp.title = title;
        if (company) newExp.company = company;
        if (from) newExp.from =from;
        if (location) newExp.location = location;
        if (to) newExp.to = to;
        if (current) newExp.current =current;
        if (description) newExp.description = description;

      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.experience.unshift(newExp);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

    // @route    DELETE api/profile/experience/:exp_id
    // @desc     Delete experience from profile
    // @access   Private

router.delete(
    '/experience/:exp_id',
    auth,
    checkObjectId('exp_id'),
    async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
  
      foundProfile.experience = foundProfile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });

   
// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private

router.put(
    '/education',
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of Study is required and needs to be from the past').notEmpty(),
    check('from', 'From is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;

      const newEdu = {};
        if (school) newEdu.school = school;
        if (degree) newEdu.degree = degree;
        if (fieldofstudy) newEdu.fieldofstudy = fieldofstudy;
        if (from) newEdu.from =from;
        if (to) newEdu.to = to;
        if (current) newEdu.current =current;
        if (description) newEdu.description = description;

      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(newEdu);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id',
    auth,
    checkObjectId('edu_id'),
    async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
  
      foundProfile.education = foundProfile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });
  
module.exports = router;

/**
 * @route GET api/profile/github/:username
 * @desc get github repositories of a User
 * @access public
 * */ 

router.get("/github/:username", (req, res) => {
  try {
      const options = {
          uri: `https://api.github.com/users/${req.params.username}/repos?sort=created:asc&client_id=${config.get("githubClientID")}&githubSecret=${config.get("githubSecret")}`,             // add this in queries to limit repo count per_page=5
          method: "GET",
          headers: {"user-agent": "node.js"}
      }

      request(options, (error, response, body) => {
          if(error) console.error(error);

          if(response.statusCode !== 200){
              return res.status(404).json({msg: "No github repos found"});
          }

          res.json(JSON.parse(body));
      });



  } catch (err) {
      console.log(err.message);
      res.status(500).send(`Server Error ${err}`);
  }
})

/**
 * @route   PUT api/profile/follow/:id
 * @desc    follow a person
 * @access  private
 */
 router.put(
  '/follow/:id', 
  auth, 
  checkObjectId('id'), 
  async (req, res) => {
    try {
      const toFollow = await Profile.findById(req.params.id);
      const follower = await Profile.findOne({user: req.user.id});
      // Check if the topic has already been followed
      // some is the array method in JS
      if(!toFollow || !follower){
        return res.status(400).json({ msg: 'profile not found' });
      }
      // console.log(topic.followers);
      if(!toFollow.followers){
        toFollow.followers = [];
      }
      if(!follower.followed){
        follower.followed = [];
      }
      // console.log(profile.followed_topics);
      const inFollowers = toFollow.followers.some((follower) => follower.user.toString() === req.user.id);
      const inFollowed = follower.followed.some((followed) => followed.user.toString() === req.params.id);
      // console.log(inProfile);
      if (inFollowers && inFollowed) {
        return res.status(400).json({ msg: 'already followed' });
      }
      else if(inFollowers || inFollowed){
        toFollow.followers = toFollow.followers.filter(
          ({ user }) => user.toString() !== req.user.id
        );
        follower.followed = follower.followed.filter((followed) => followed.user.toString() !== req.params.id);
        // return res.status(400).json({ msg: 'continuity error' });
      }

      toFollow.followers.unshift({ user: req.user.id });
      follower.followed.unshift({user: req.params.id});
      await toFollow.save();
      await follower.save();

      return res.json({ followers: toFollow.followers, followed: follower.followed });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});
/**@Note profile id is stored in the user of the followed array */


/**
 * @route   PUT api/profile/unfollow/:id
 * @desc    unfollow topic
 * @access  private
 */
 router.put(
  '/unfollow/:id',
   auth, 
   checkObjectId('id'), 
   async (req, res) => {
    try {
      const toFollow = await Profile.findById(req.params.id);
      const follower = await Profile.findOne({user: req.user.id});
      // Check if the topic has already been followed
      // some is the array method in JS
      if(!toFollow || !follower){
        return res.status(400).json({ msg: 'profile not found' });
      }
      // console.log(topic.followers);
      if(!toFollow.followers){
        toFollow.followers = [];
      }
      if(!follower.followed){
        follower.followed = [];
      }
      // console.log(profile.followed_topics);
      const inFollowers = toFollow.followers.some((follower) => follower.user.toString() === req.user.id);
      const inFollowed = follower.followed.some((followed) => followed.user.toString() === req.params.id);
      // Check if the topic has not yet been followed
      if (!inFollowers && !inFollowed) {
        return res.status(400).json({ msg: 'topic has not yet been followed' });
      }
   
      toFollow.followers = toFollow.followers.filter(
        ({ user }) => user.toString() !== req.user.id
      );
      follower.followed = follower.followed.filter((followed) => followed.user.toString() !== req.params.id);


      await toFollow.save();
      await follower.save();

      return res.json({ followers: toFollow.followers, followed: follower.followed });
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});
