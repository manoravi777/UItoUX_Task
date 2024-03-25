const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    
    },
    value: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('category', categorySchema);
