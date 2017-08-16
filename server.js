const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./mdx_backend/router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/mdx_frontend`));

if (process.env.MONGODB_USERNAME) {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const mongoUri = process.env.MONGODB_CONNSTR;
  const connectionString = `mongodb://${username}:${password}@${mongoUri}`;
  mongoose.connect(connectionString);
} else {
  mongoose.connect('mongodb://localhost/memedex');
}

mongoose.Promise = Promise;
app.use('/api', apiRoutes);


app.listen(process.env.port || 3000);

module.exports = app;
