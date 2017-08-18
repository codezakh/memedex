const express = require('express');
const userRoutes = require('./users/userRoutes');
const memeRoutes = require('./memes/memeRoutes');
const memeListRoutes = require('./memelists/memeListRoutes');
const auth = require('./auth');

const router = express.Router({ mergeParams: true });

router.use('/user', userRoutes);
router.use('/meme', memeRoutes);
router.use('/memelist', memeListRoutes);
router.use('/auth', auth);

module.exports = router;
