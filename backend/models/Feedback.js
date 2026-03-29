const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    emoji: { type: String, required: true }, // Store emoji or emoji index
    feedbackText: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user providing feedback
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
