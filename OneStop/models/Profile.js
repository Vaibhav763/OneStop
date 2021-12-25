const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  followed: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  followed_topics: [
    {
      topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);


// in this file we have created Profile model that what data we required to make a profile

// Profile is the model over here which we created and that gonna follow the defined Schema
// mongoose.model('profile', ProfileSchema) = 
// "profile" is the collection name which we created using the above defined schema i.e ProfileSchema