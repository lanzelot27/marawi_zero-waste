const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Policy', PolicySchema);
