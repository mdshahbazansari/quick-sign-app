// routes/signatures.js

const express = require('express');
const router = express.Router();
const Signature = require('../models/Signature');

router.post('/', async (req, res) => {
    try {
        const { signatureData } = req.body;
        const newSignature = new Signature({ signatureData });
        await newSignature.save();
        res.status(201).json({ message: 'Signature saved successfully', signatureId: newSignature._id });
    } catch (error) {
        console.error('Error saving signature:', error);
        res.status(500).json({ message: 'Failed to save signature' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const signature = await Signature.findById(req.params.id);
        if (!signature) {
            return res.status(404).json({ message: 'Signature not found' });
        }
        res.json(signature);
    } catch (error) {
        console.error('Error fetching signature:', error);
        res.status(500).json({ message: 'Failed to fetch signature' });
    }
});

module.exports = router;
