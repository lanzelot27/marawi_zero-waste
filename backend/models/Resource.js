// models/Resource.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    image: { type: String }, // Image path
    type: { type: String, required: true }, // E.g., biodegradable, recyclable
});

module.exports = mongoose.model('Resource', ResourceSchema);
