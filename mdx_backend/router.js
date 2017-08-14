const express = require('express');
const userRoutes = require('./users/userRoutes');
const memeRoutes = require('./memes/memeRoutes');
const memeListRoutes = require('./memelists/memeListRoutes');

const router = express.Router({ mergeParams: true });

router.use('/user', userRoutes);
router.use('/meme', memeRoutes);
router.use('/memelist', memeListRoutes);

module.exports = router;
