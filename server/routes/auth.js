const express = require('express');
const router = express.Router();
const User = require('../models/User');

// In-memory user storage (for when DB is not available)
const inMemoryUsers = new Map();

// Register/Login (Simple for now)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Try to use MongoDB first
        let user = await User.findOne({ username }).maxTimeMS(2000); // 2 second timeout

        if (!user) {
            // Create new user if not exists (Auto-register)
            user = new User({ username, password });
            await user.save();
        } else {
            if (user.password !== password) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        }
        res.json(user);
    } catch (err) {
        // Fallback to in-memory storage if DB fails
        console.log('MongoDB not available, using in-memory storage');

        let user = inMemoryUsers.get(username);

        if (!user) {
            // Create new user in memory
            user = {
                _id: Date.now().toString(),
                username,
                password,
                progress: {
                    alphabets: 0,
                    numbers: 0,
                    science: 0
                },
                createdAt: new Date()
            };
            inMemoryUsers.set(username, user);
        } else {
            if (user.password !== password) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    }
});

// Get User Progress
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).maxTimeMS(2000);
        if (!user) {
            // Check in-memory storage
            const memUser = inMemoryUsers.get(req.params.username);
            if (!memUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(memUser);
        }
        res.json(user);
    } catch (err) {
        // Fallback to in-memory
        const memUser = inMemoryUsers.get(req.params.username);
        if (!memUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(memUser);
    }
});

module.exports = router;
