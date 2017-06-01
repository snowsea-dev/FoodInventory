'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    email: String,
    password: String
});

userSchema.methods.validPassword = function(password) {
    return password == this.password;
}

module.exports = mongoose.model('user', userSchema);

