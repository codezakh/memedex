const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./mdx_backend/router');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/memedex');
mongoose.Promise = Promise;
app.use('/api', apiRoutes);


app.listen(3000);

module.exports = app;
