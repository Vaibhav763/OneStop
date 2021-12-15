const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'topic'
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      upvotes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],
      downvotes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);


// in this file we have created Post model that what data we required to make a post 

// Post is the model over here which we created and that gonna follow the defined Schema
// mongoose.model('post', PostSchema) = 
// "post" is the collection name which we created using the above defined schema i.e PostSchema

// in post schema we have again make an avatar so that we can directly use it without interacting with user model