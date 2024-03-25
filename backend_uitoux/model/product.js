const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    productNumber: {
        type: String,
        required: false,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    discountPrice: {
        type: Number,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    }
});

productSchema.virtual('averageRating', {
    ref: 'rating',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
    count: true,
    avgRating: { $avg: '$rating' }
  });

module.exports = new mongoose.model('product', productSchema);
