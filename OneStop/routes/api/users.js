const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// @route   POST api/users/test
// @desc    Register users 
// @access  Public
router.post('/',[
    check('name','Name is required').notEmpty(),
    check('email','Please Enter valid Email').isEmail(),
    check('password','Please enter a password of minimum length 6').isLength({min:6})
],
 (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({erros: errors.array()});
    }
    res.send('User route');
     });

module.exports = router;
