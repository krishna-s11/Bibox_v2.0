const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Donors', donorSchema);