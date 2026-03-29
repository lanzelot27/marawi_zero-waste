const mongoose = require("mongoose");

const proofSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        typeOfWaste: {
            type: String,
            required: true,
        },
        nameOfWaste: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        photo: {
            type: String, // Stores the filename of the uploaded photo
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Proof", proofSchema);
