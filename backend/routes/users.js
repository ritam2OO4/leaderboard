// routes/users.js
const router = require('express').Router();
const Users = require('../models/User');

// Create initial users (run once)
router.post('/initialize', async (req, res) => {
    const users = ['Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 'Neha', 'Vikram', 'Sanya', 'Raj', 'Anjali'];
    try {
        await Users.insertMany(users.map(name => ({ name })));
        res.status(201).send('Users created');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add new user
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newUser = new Users({ name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await Users.find().sort({ totalPoints: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;