const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // In a real app, hash this!
    progress: {
        alphabets: { type: Number, default: 0 },
        numbers: { type: Number, default: 0 },
        science: { type: Number, default: 0 },
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
