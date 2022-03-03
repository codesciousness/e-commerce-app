const express = require('express');
const usersRouter = express.Router();
const ordersRouter = require('./orders');
const db = require('../../db/queries');
const { authenticateToken } = require('../../util/jwt');
require('dotenv').config();

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else res.redirect(process.env.AUTH_FAILURE_REDIRECT);
};

// GET /users to get an array of all users

// usersRouter.get('/', db.getUsers);

// POST /users to create a new user and save it to the database

usersRouter.post('/register', db.registerUser);

//userId param

usersRouter.param('userId', db.setUserId);

// GET /users/:userId to get a single user by id

usersRouter.get('/:userId', db.getUserById);

// PUT /users/:userId to update a single user by id

usersRouter.put('/:userId', authenticate /*authenticateToken*/, db.updateUser);

usersRouter.use('/:userId/orders', ordersRouter);

module.exports = usersRouter;