const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    
    },
    product: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max:5
    }
});

module.exports = new mongoose.model('rating', ratingSchema);
