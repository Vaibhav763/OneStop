const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Topic = mongoose.model('topic', TopicSchema);