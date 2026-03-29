// models/AdminMessage.js
const mongoose = require('mongoose');

const adminMessageSchema = new mongoose.Schema({
    communityUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the community user
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdminMessage', adminMessageSchema);
