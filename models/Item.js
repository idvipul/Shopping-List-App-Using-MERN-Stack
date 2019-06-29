const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date.now
    }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;