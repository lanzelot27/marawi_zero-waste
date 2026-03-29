const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMW"); // Your auth middleware
const upload = require("../middleware/multerMW"); // Your multer middleware
const Proof = require("../models/Proof"); // Proof model

// POST route for proof submission
router.post("/proof", auth, upload.single("photo"), async (req, res) => {
    try {
        const { typeOfWaste, nameOfWaste, message } = req.body;

        // Validation
        if (!typeOfWaste || !nameOfWaste || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new proof document
        const newProof = new Proof({
            user: req.user.userId, // Extracted from the token in `authMW`
            typeOfWaste,
            nameOfWaste,
            message,
            photo: req.file ? req.file.filename : null, // Save the filename if a file is uploaded
        });

        await newProof.save();

        res.status(201).json({ message: "Proof submitted successfully!" });
    } catch (error) {
        console.error("Error submitting proof:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// GET all proofs
router.get('/proof', auth, async (req, res) => {
    try {
        const proofs = await Proof.find().populate('user', 'firstName lastName'); // Adjust to your Proof model
        res.status(200).json(proofs);
    } catch (error) {
        console.error('Error fetching proofs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE a proof by ID
router.delete('/proof/:id', auth, async (req, res) => {
    try {
        const proof = await Proof.findByIdAndDelete(req.params.id);
        if (!proof) {
            return res.status(404).json({ message: 'Proof not found' });
        }
        res.status(200).json({ message: 'Proof deleted successfully' });
    } catch (error) {
        console.error('Error deleting proof:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
