const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema(structure of our database) for our User model (initially required to register)

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);

// in this file we have created User model that what data we required to make a user register 

// User is the model over here which we created and that gonna follow the defined Schema
// mongoose.model('users', UserSchema) = 
// "users" is the collection name which we created using the above defined schema i.e UserSchema