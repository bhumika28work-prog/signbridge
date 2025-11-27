const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    module: { type: String, required: true, enum: ['alphabet', 'number', 'science', 'math'] },
    title: { type: String, required: true },
    content: { type: String, required: true }, // Could be text, video URL, or JSON
    signVideoUrl: { type: String }, // URL to sign language video
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    order: { type: Number, required: true }
});

module.exports = mongoose.model('Lesson', LessonSchema);
