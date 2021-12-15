const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    followers: [{
        user : {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        date : {
            type: Date,
            default: Date.now()
        }
    }]
});

module.exports = Topic = mongoose.model('topic', TopicSchema);