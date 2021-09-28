const express = require('express');
const customersRouter = express.Router();
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');
const db = require('../../db/');

// GET /api/customers to get an array of all customers

customersRouter.get('/', (req, res) => {
    const customers = db.query('SELECT * FROM customers', [req.params.id], (err, result) => {
        if (err) {
          return next(err);
        }
        res.send(result.rows[0]);
    });
});

// POST /api/customers to create a new customer and save it to the database

customersRouter.post('/', (req, res) => {
    const newCustomer = addToDatabase('customers', req.body);
    if (newCustomer) {
        res.status(201).send(newCustomer);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

//customerId param

customersRouter.param('customerId', (req, res, next, id) => {
    const customerId = id;
    const customers = getAllFromDatabase('customers');
    const customerIndex = customers.findIndex(customer => customer.id === customerId);
    if (customerIndex > -1) {
        req.customerId = customerId;
        next();
    }
    else {
        res.status(404).send('Not Found');
    }
});

// GET /api/customers/:customerId to get a single customer by id

customersRouter.get('/:customerId', (req, res) => {
    const customer = getFromDatabaseById('customers', req.customerId);
    res.send(customer);
});

// PUT /api/customers/:customerId to update a single customer by id

customersRouter.put('/:customerId', (req, res) => {
    const updatedCustomer = updateInstanceInDatabase('customers', req.body);
    res.send(updatedCustomer);
});

// DELETE /api/customers/:customerId to delete a single customer by id

customersRouter.delete('/:customerId', (req, res) => {
    const customerDeleted = deleteFromDatabasebyId('customers', req.customerId);
    if (customerDeleted) {
        res.status(204).send();
    }
    else {
        res.status(404).send('Not Found');
    }
});

customersRouter.use('/:customerId/cart', cartsRouter);
customersRouter.use('/:customerId/orders', ordersRouter);

module.exports = customersRouter;