const express = require('express');
const customersRouter = express.Router();
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');
const db = require('../../db/queries');

// GET /api/customers to get an array of all customers

customersRouter.get('/', db.getUsers);

customersRouter.get('/register', (req, res, next) => {
    res.send('Register');
});

// POST /api/customers to create a new customer and save it to the database

customersRouter.post('/register', db.registerUser);

customersRouter.get('/login', (req, res, next) => {
    res.send('Login');
});

// POST /api/customers to login a customer

customersRouter.post('/login', db.loginUser);

customersRouter.get('/dashboard', (req, res, next) => {
    res.send('Dashboard');
});

customersRouter.get('/logout', db.logoutUser);

//customerId param

customersRouter.param('customerId', db.setUserId);

// GET /api/customers/:customerId to get a single customer by id

customersRouter.get('/:customerId', db.getUserById);

// PUT /api/customers/:customerId to update a single customer by id

customersRouter.put('/:customerId', db.updateUser);

// DELETE /api/customers/:customerId to delete a single customer by id

customersRouter.delete('/:customerId', db.deleteUser);

customersRouter.use('/:customerId/cart', cartsRouter);
customersRouter.use('/:customerId/orders', ordersRouter);

module.exports = customersRouter;