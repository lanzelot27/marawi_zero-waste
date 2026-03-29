// models/CommunityMessage.js
const mongoose = require('mongoose');

const communityMessageSchema = new mongoose.Schema({
    comuserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CommunityMessage', communityMessageSchema);
