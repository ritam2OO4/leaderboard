// routes/claims.js
const router = require('express').Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim points endpoint
router.post('/:userId', async (req, res) => {
    try {
        const points = Math.floor(Math.random() * 10) + 1;
        const user = await User.findById(req.params.userId);

        if (!user) return res.status(404).send('User not found');

        // Create history record
        const history = new ClaimHistory({
            userId: user._id,
            points
        });
        await history.save();

        // Update user points
        user.totalPoints += points;
        await user.save();

        res.json({ points, totalPoints: user.totalPoints });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get claim history
router.get('/history', async (req, res) => {
    try {
        const history = await ClaimHistory.find().populate('userId', 'name');
        res.json(history);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;