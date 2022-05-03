const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = Schema({
    user_id : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Token = mongoose.model('token', TokenSchema);