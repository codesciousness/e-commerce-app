const express = require('express');
const usersRouter = express.Router();
const ordersRouter = require('./orders');
const db = require('../../db/queries');
const { authenticateToken } = require('../../util/jwt');

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else res.redirect('/auth/login');
};

// GET /users to get an array of all users

usersRouter.get('/', db.getUsers);

usersRouter.get('/register', (req, res) => {
    res.send('Register');
});

// POST /users to create a new user and save it to the database

usersRouter.post('/register', db.registerUser);

usersRouter.get('/profile', authenticate, (req, res) => {
    res.send('You are logged in ' + req.user.first_name);
});

//userId param

usersRouter.param('userId', db.setUserId);

// GET /users/:userId to get a single user by id

usersRouter.get('/:userId', db.getUserById);

// PUT /users/:userId to update a single user by id

usersRouter.put('/:userId', authenticateToken, db.updateUser);

usersRouter.use('/:userId/orders', ordersRouter);

module.exports = usersRouter;