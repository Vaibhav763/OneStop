const express = require('express'); //inherited express class from library 
// const mongoose = require('mongoose');

// const users = require('./routes/api/users');
// const profile = require('./routes/api/profile');
// const posts = require('./routes/api/posts');

const app = express(); // created object of express class 

// DB Config
// const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World')); //simple get method on our object 

// // Use Routes
// app.use('/api/users', users);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

const port = process.env.PORT || 5000; // built port 

app.listen(port, () => console.log(`Server running on port ${port}`));
