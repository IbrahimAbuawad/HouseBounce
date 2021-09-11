const mongoose = require('mongoose');


const property = new mongoose.Schema({
    ownerId: { type: String, required: true, },
    ownerName: { type: String, required: true },
    houseDescription: { type: String, required: true },
    salePrice: { type: Number, required: true },
    location: { type: String, required: true },
    size: { type: String, required: true, default: 'normal', enum: ['duplex', 'normal'] },
    reqStatus: { type: String, required: true, default: 'pending', enum: ['pending', 'approved', 'rejected'] }
})

module.exports = mongoose.model('property', property)