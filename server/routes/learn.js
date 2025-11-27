const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

// Mock data for when DB is not available
const getMockLessons = (module) => {
    const mockData = {
        'gujarati-alphabets': [
            { _id: '1', module: 'gujarati-alphabets', title: 'Vowel A (અ)', content: 'The first vowel in Gujarati is A (અ). It is pronounced like "a" in "about".', order: 1 },
            { _id: '2', module: 'gujarati-alphabets', title: 'Vowel Aa (આ)', content: 'The second vowel is Aa (આ). It is pronounced like "a" in "father".', order: 2 },
            { _id: '3', module: 'gujarati-alphabets', title: 'Vowel I (ઇ)', content: 'The third vowel is I (ઇ). It is pronounced like "i" in "bit".', order: 3 },
        ],
        'numbers': [
            { _id: '1', module: 'numbers', title: 'Number 1 (૧)', content: 'This is the number one in Gujarati: ૧', order: 1 },
            { _id: '2', module: 'numbers', title: 'Number 2 (૨)', content: 'This is the number two in Gujarati: ૨', order: 2 },
            { _id: '3', module: 'numbers', title: 'Number 3 (૩)', content: 'This is the number three in Gujarati: ૩', order: 3 },
        ],
        'science': [
            { _id: '1', module: 'science', title: 'Parts of a Plant', content: 'Plants have roots, stems, leaves, and flowers. Each part has a special job!', order: 1 },
            { _id: '2', module: 'science', title: 'Water Cycle', content: 'Water evaporates, forms clouds, and falls as rain in a continuous cycle.', order: 2 },
        ]
    };
    return mockData[module] || [];
};

// Get all lessons for a module
router.get('/:module', async (req, res) => {
    try {
        const lessons = await Lesson.find({ module: req.params.module }).sort({ order: 1 });

        // If no lessons found in DB, return mock data
        if (!lessons || lessons.length === 0) {
            console.log(`No lessons found in DB for ${req.params.module}, using mock data`);
            return res.json(getMockLessons(req.params.module));
        }

        res.json(lessons);
    } catch (err) {
        console.error('Error fetching lessons:', err.message);
        // Return mock data on error (e.g., DB not connected)
        res.json(getMockLessons(req.params.module));
    }
});

// Add a lesson (for seeding/admin)
router.post('/', async (req, res) => {
    const lesson = new Lesson(req.body);
    try {
        const newLesson = await lesson.save();
        res.status(201).json(newLesson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
