// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userIdm: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    senderType: { type: String, enum: ['community', 'admin'], required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
