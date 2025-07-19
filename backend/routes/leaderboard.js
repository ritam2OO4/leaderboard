// routes/leaderboard.js
const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.aggregate([
            { $sort: { totalPoints: -1 } },
            {
                $group: {
                    _id: null,
                    users: { $push: "$$ROOT" }
                }
            },
            {
                $unwind: {
                    path: "$users",
                    includeArrayIndex: "rank"
                }
            },
            {
                $project: {
                    _id: "$users._id",
                    name: "$users.name",
                    totalPoints: "$users.totalPoints",
                    rank: { $add: ["$rank", 1] }
                }
            }
        ]);

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;