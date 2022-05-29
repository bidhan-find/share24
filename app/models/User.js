/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    profileImage: {
        type: String,
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
