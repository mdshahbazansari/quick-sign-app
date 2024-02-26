// models/Signature.js

const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
    signatureData: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Signature', signatureSchema);
