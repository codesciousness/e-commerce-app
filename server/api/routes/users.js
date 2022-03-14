const express = require('express');
const usersRouter = express.Router();
const cartRouter = require('./cart');
const ordersRouter = require('./orders');
const db = require('../../db/queries');
const { authenticateToken } = require('../../util/jwt');
require('dotenv').config();

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else return res.status(401).send('Please log in to complete this action.');
};

// GET /users to get an array of all users

// usersRouter.get('/', db.getUsers);

// POST /users/register to create a new user and save user to the database

usersRouter.post('/register', db.registerUser);

//userId param

usersRouter.param('userId', db.setUserId);

// GET /users/:userId to get a single user by id

usersRouter.get('/:userId', db.getUserById);

// PUT /users/:userId to update a single user by id

usersRouter.put('/:userId', authenticate /*authenticateToken*/, db.updateUser);

// PUT /users/:userId/password to update a single user's password by id

usersRouter.put('/:userId/password', authenticate /*authenticateToken*/, db.changePassword);

// Create /users/:userId/cart route to add on cartRouter routes to handle a single user's cart items

usersRouter.use('/:userId/cart', cartRouter);

// Create /users/:userId/orders route to add on ordersRouter routes to handle a single user's orders

usersRouter.use('/:userId/orders', ordersRouter);

module.exports = usersRouter;