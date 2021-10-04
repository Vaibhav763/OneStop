const express = require('express'); 

// connecting mongo DB
const connectDB = require('./config/db');
connectDB();

// imported routes from different route files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

const app = express(); 

// middleware that allow us to handle raw json
app.use(express.json({extended:false}));

// Using different Routes as middleware
 app.use('/api/users', users);
 app.use('/api/profile', profile);
 app.use('/api/posts', posts);
 app.use('/api/auth', auth);

app.get('/', (req, res) => res.send('Hello World')); 

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server running on port ${port}`));


 