const express = require('express');
const router = express.Router();
const Marker = require('../models/Marker');

// GET all markers
router.get('/', async (req, res) => {
  try {
    const markers = await Marker.find().populate('schedule');
    res.status(200).json(markers);
  } catch (error) {
    console.error('Error fetching markers:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST a new marker
router.post('/', async (req, res) => {
  try {
    const { position, schedule } = req.body;

    const newMarker = new Marker({
      position,
      schedule,
    });

    await newMarker.save();
    res.status(201).json(newMarker);
  } catch (error) {
    console.error('Error creating marker:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE a marker
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Marker.findByIdAndDelete(id);
    res.status(200).json({ message: 'Marker deleted successfully.' });
  } catch (error) {
    console.error('Error deleting marker:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
