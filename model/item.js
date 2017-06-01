'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = mongoose.Schema({
    user: String,
    name: String,
    description: String,
    expireDate: String
});

module.exports = mongoose.model('item', itemSchema);

