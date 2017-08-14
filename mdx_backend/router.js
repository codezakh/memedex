const express = require('express');
const userRoutes = require('./users/userRoutes');
const memeRoutes = require('./memes/memeRoutes');

const router = express.Router({ mergeParams: true });

router.use('/user', userRoutes);
router.use('/meme', memeRoutes);

module.exports = router;
