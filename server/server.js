const express = require('express');
const app = express();
const apiRouter = require('./api/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const keys = require('./config/keys');

//Passport config
require('./config/passport')(passport);

const PORT = process.env.PORT || 4001;

app.use('/public', express.static('public'));

app.get('/', (req, res, next) => { 
  res.sendFile('index.html', { root: __dirname });
});

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Logging
app.use(morgan('dev'));

app.use(passport.initialize());

// Mount your existing apiRouter below.
app.use(apiRouter);

//Add middleware for sessions
app.use(session({
  secret: keys.session.secret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true },
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(cookieParser());

app.use(passport.session());

app.use(flash());

// Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

module.exports = app;