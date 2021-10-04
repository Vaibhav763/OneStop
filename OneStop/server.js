const express = require('express'); //inherited express class from library 

// connecting mongo DB
const connectDB = require('./config/db');
connectDB();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express(); // created object of express class 

app.get('/', (req, res) => res.send('Hello World')); //simple get method on our object 

const port = process.env.PORT || 5000; // built port 
app.listen(port, () => console.log(`Server running on port ${port}`));

// init middleware
app.use(express.json({extended:false}));

// Use Routes
 app.use('/api/users', users);
 app.use('/api/profile', profile);
 app.use('/api/posts', posts);


 