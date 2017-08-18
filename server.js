const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const apiRoutes = require('./mdx_backend/router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/mdx_frontend`));

// auth stuff
app.use(cookieParser());
app.use(expressSession({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.MONGODB_USERNAME) {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const mongoUri = process.env.MONGODB_CONNSTR;
  const connectionString = `mongodb://${username}:${password}@${mongoUri}/memedex`;
  mongoose.connect(connectionString);
} else if (process.env.MEMEDEX_TEST) {
  mongoose.connect('mongodb://localhost/memedex-test');
} else {
  mongoose.connect('mongodb://localhost/memedex');
}

mongoose.Promise = Promise;
app.use('/api', apiRoutes);


app.listen(process.env.PORT || 3000);

module.exports = app;
