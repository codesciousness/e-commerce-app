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

// Mount your existing apiRouter below at the '/api' path.
app.use('/api', apiRouter);

//Add middleware for sessions
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(cookieParser());

app.use(flash());

// Add Passport middleware
app.use(passport.initialize());

app.use(passport.session());

// Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`)
});

module.exports = app;