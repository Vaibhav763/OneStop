const mongoose = require('mongoose');
const config = require('config');
const db= config.get('mongoURI');

//link to our cloud database is in mongoURI variable in default.json file

// this function connects our application to our database

const connectDB = async () => {

    try{
        await mongoose.connect(db , {
            useNewUrlParser:true,
        });
        console.log('MongoDB Connected');
    } 
    catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;