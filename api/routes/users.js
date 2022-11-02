const express = require('express');
const usersRouter = express.Router();
const cartRouter = require('./cart');
const ordersRouter = require('./orders');
const db = require('../../db/queries');
const authenticate = require('../../util/authenticate');
const { authenticateToken } = require('../../util/jwt');
require('dotenv').config();

// GET /users to get an array of all users

// usersRouter.get('/', db.getUsers);

// POST /users/register to create a new user and save user to the database

usersRouter.post('/register', db.registerUser, db.loginUser);

//userId param

usersRouter.param('userId', db.setUserId);

// GET /users/:userId to get a single user by id

usersRouter.get('/:userId', db.getUserById);

// PUT /users/:userId to update a single user by id

usersRouter.put('/:userId', authenticate, db.updateUser);

// PUT /users/:userId/password to update a single user's password by id

usersRouter.put('/:userId/password', authenticate, db.changePassword);

// Create /users/:userId/cart route to add on cartRouter routes to handle a single user's cart items

usersRouter.use('/:userId/cart', cartRouter);

// Create /users/:userId/orders route to add on ordersRouter routes to handle a single user's orders

usersRouter.use('/:userId/orders', ordersRouter);

module.exports = usersRouter;