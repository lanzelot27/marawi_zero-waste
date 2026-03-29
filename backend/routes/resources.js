// routes/resources.js
const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const upload = require('../middleware/multerMW');
const fs = require('fs');
const mongoose = require('mongoose');

// GET all resources
router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get resources by type
router.get('/:type', async (req, res) => {
    try {
        const resources = await Resource.find({ type: req.params.type });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new resource with image upload
router.post('/', upload.single('image'), async (req, res) => {
    const { name, points, type } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const resource = new Resource({
        name,
        points,
        type,
        image: imagePath // Save image path to the database
    });

    try {
        const newResource = await resource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Find the resource
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        // Delete the image file if it exists
        if (resource.image) {
            fs.unlink(resource.image, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }

        // Use deleteOne instead of remove
        await Resource.deleteOne({ _id: req.params.id });
        res.json({ message: 'Resource deleted successfully' });
    } catch (err) {
        console.error('Error stack:', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an existing resource
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, points } = req.body;

        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        resource.name = name;
        resource.points = points;

        if (req.file) {
            if (resource.image) {
                fs.unlink(resource.image, (err) => {
                    if (err) console.error('Error deleting old file:', err);
                });
            }
            resource.image = req.file.path;
        }

        const updatedResource = await resource.save();
        res.json(updatedResource);
    } catch (err) {
        console.error('Error updating resource:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
