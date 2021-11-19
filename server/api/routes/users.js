const express = require('express');
const usersRouter = express.Router();
const cartRouter = require('./cart');
const ordersRouter = require('./orders');
const db = require('../../db/queries');
const { authenticateToken } = require('../../util/jwt');

// GET /users to get an array of all users

usersRouter.get('/', db.getUsers);

usersRouter.get('/register', (req, res) => {
    res.send('Register');
});

// POST /users to create a new user and save it to the database

usersRouter.post('/register', db.registerUser);

usersRouter.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('You are logged in ' + req.user.first_name);
    }
    else res.redirect('/auth/login');
});

//userId param

usersRouter.param('userId', db.setUserId);

// GET /users/:userId to get a single user by id

usersRouter.get('/:userId', db.getUserById);

// PUT /users/:userId to update a single user by id

usersRouter.put('/:userId', authenticateToken, db.updateUser);

// DELETE /users/:userId to delete a single user by id

usersRouter.delete('/:userId', authenticateToken, db.deleteUser);

usersRouter.use('/:userId/cart', cartRouter);
usersRouter.use('/:userId/orders', ordersRouter);

module.exports = usersRouter;