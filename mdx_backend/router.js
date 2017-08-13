const express = require('express');
const userRoutes = require('./users/userRoutes');

const router = express.Router({ mergeParams: true });

router.use('/user', userRoutes);

module.exports = router;
