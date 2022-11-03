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
const path = require('path');
const db = require('./db');
require('dotenv').config();
const { PORT = 4001, NODE_ENV = 'development' } = process.env;
const IN_PROD = NODE_ENV === 'production';
const oneDay = 1000 * 60 * 60 * 24;
const corsOptions = {
  origin: ['http://localhost:4001/', 'http://localhost:3000/', 'https://plus-ultra-store.herokuapp.com/'],
  credentials: true
};

//Passport config
require('./config/passport')(passport);

// Add middleware for handling CORS requests
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// Serve server's index.html file
/*app.get('/', (req, res, next) => { 
  res.sendFile('index.html', { root: __dirname });
});*/

// Serve static content in production
if (IN_PROD) {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.set('trust proxy', true);
};

app.use(flash());

// Add middware for parsing request bodies
app.use(bodyParser.json());

// Logging
app.use(morgan('dev'));

app.use(cookieParser());

// Add middleware for sessions
app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: IN_PROD,
    maxAge: oneDay,
    sameSite: true,
    secure: IN_PROD
  },
  store: db.sessionHandler(session)
}));

app.use(passport.initialize());
app.use(passport.session());

// Use apiRouter
app.use(apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Add code to start the server listening
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
  // To generate jwt token secret: console.log(require('crypto').randomBytes(64).toString('hex'));
});

module.exports = app;