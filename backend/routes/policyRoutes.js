const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');

// Get all policies
router.get('/', async (req, res) => {
    try {
        const policies = await Policy.find();
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch policies.' });
    }
});

// Add a new policy
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPolicy = new Policy({ title, content });
        await newPolicy.save();
        res.json(newPolicy);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add policy.' });
    }
});

// Update a policy
router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPolicy = await Policy.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(updatedPolicy);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update policy.' });
    }
});

// Delete a policy
router.delete('/:id', async (req, res) => {
    try {
        await Policy.findByIdAndDelete(req.params.id);
        res.json({ message: 'Policy deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete policy.' });
    }
});

module.exports = router;
