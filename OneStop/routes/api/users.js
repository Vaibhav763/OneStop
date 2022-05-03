const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult, Result } = require('express-validator');
const normalize = require('normalize-url');
// import { v4 as uuidv4 } from 'uuid';
const {v4: uuidv4} = require("uuid");
const Token = require("../../models/Token");
const User = require('../../models/User');   // fetched User model from our model folder
const nodemailer = require("nodemailer");


// @route    POST api/users
// @desc     Register user
// @access   Public

//  intially verifying weather entered details by user are correct 
// or not using express validator and result get saved in "validationResult"

router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the entries entered 
    const { name, email, password } = req.body;

    // Looking if user already exists
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get users gravatar (basically profile picture)
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      // creating new user document(basically record) in our database 
      // with entered values using the User model that we have created 
      // in of User.js Model folder 
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // encrypting the password using bcryptjs 
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

    // creating json web token for authenication and logging in purpose

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route POST /api/users/reset_password
 * @description reset password initialization
 * @access public
 */

router.post("/reset_password", check("email").not().isEmpty(), async (req, res) => {
  const ress = validationResult(req);
  if(!ress.isEmpty()){
    return res.status(400).json({errors: ress.array()});
  }
  try {
    // const _id = req.body._id;
    const user = await User.findOne({email: req.body.email});

    let token = await Token.findOne({user_id: user._id});

    if(token == null){
      const newToken = {
        user_id: user._id,
        token: uuidv4()
      };
  
      token = new Token(newToken);
      await token.save();
    }
    else{
      token.token = uuidv4();
      await token.save();
    }
    
    const testAccount = await nodemailer.createTestAccount();

    const transports = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    let info = await transports.sendMail({
      from: testAccount.user,
      to: user.email,
      subject: "Change your Password",
      text: "",
      html: `To reset your password click <a href="http://localhost:3000/reset_password/${token.token}">here</a>`
    });

    console.log(nodemailer.getTestMessageUrl(info));
    return res.json({msg: "Email sent successfully"})
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

/**
 * @route POST /api/users/reset_password/final
 * @description reset password finalization
 * @access public
 */
router.post("/reset_password/final/", check("password").not().isEmpty(), check("token").not().isEmpty(), async (req, res) => {
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    try {
     
      let token = await Token.findOne({token: req.body.token});
      const user = await User.findOne({_id: token.user_id});
      if(token == null){
        return res.status(401).json({msg: "token expired"});
      }
      if(user != null){
        // encrypting the password using bcryptjs 
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();
        token = await Token.findByIdAndDelete(token._id);

        return res.json({msg: "success"});
      }
      else{
        return res.status(401).json({errors: {msg: "User does not exist"}});
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
})

module.exports = router;

