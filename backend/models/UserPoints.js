const mongoose = require("mongoose");

const UserPointsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        default: 0, // Initialize points to 0
    },
});

module.exports = mongoose.model("UserPoints", UserPointsSchema);
