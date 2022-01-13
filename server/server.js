const express = require('express');
const app = express();
const apiRouter = require('./api/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const flash = require('connect-flash');
const keys = require('./config/keys');
const { PORT = 4001, NODE_ENV = 'development' } = process.env;
const IN_PROD = NODE_ENV === 'production';
const oneDay = 1000 * 60 * 60 * 24;
const corsOptions = {
  origin: 'http://localhost:4001/',
};

//Config dotenv
require('dotenv').config();

//Passport config
require('./config/passport')(passport);

app.use('/public', express.static('public'));

app.get('/', (req, res, next) => { 
  res.sendFile('index.html', { root: __dirname });
});

// Add middleware for handling CORS requests from index.html
app.use(cors(corsOptions));

app.use(flash());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Logging
app.use(morgan('dev'));

app.use(cookieParser());

//Add middleware for sessions
app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: keys.session.secret,
  cookie: {
    maxAge: oneDay,
    sameSite: true,
    secure: IN_PROD,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Mount your existing apiRouter below.
app.use(apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
  //To generate jwt token secret: console.log(require('crypto').randomBytes(64).toString('hex'));
});

module.exports = app;