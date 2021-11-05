const express = require('express');
const usersRouter = express.Router();
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');
const db = require('../../db/queries');

// GET /users to get an array of all users

usersRouter.get('/', db.getUsers);

usersRouter.get('/register', (req, res, next) => {
    res.send('Register');
});

// POST /users to create a new user and save it to the database

usersRouter.post('/register', db.registerUser);

usersRouter.get('/dashboard', (req, res, next) => {
    res.send('Dashboard');
});

//userId param

usersRouter.param('userId', db.setUserId);

// GET /users/:userId to get a single user by id

usersRouter.get('/:userId', db.getUserById);

// PUT /users/:userId to update a single user by id

usersRouter.put('/:userId', db.updateUser);

// DELETE /users/:userId to delete a single user by id

usersRouter.delete('/:userId', db.deleteUser);

usersRouter.use('/:userId/cart', cartsRouter);
usersRouter.use('/:userId/orders', ordersRouter);

module.exports = usersRouter;