const express = require('express');
const router = express.Router();
const upload = require("../middleware/multerMW"); // Your multer middleware

const Event = require('../models/Event');


// Fetch all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events.' });
    }
});

// Add a new event
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description, date, time, location } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const newEvent = new Event({ title, description, date, time, location, image });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add event.' });
    }
});

// Update an event
router.put('/:id', upload.single('image'), async (req, res) => {
    const { title, description, date, time, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, time, location, ...(image && { image }) },
            { new: true }
        );
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update event.' });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event.' });
    }
});

module.exports = router;
