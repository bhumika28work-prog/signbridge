const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deaf-mute-learning-app')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        console.log('Running without database - using mock data');
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/learn', require('./routes/learn'));

app.get('/', (req, res) => {
    res.send('Deaf & Mute Learning App API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
