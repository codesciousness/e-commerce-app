const express = require('express');
const customersRouter = express.Router();
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');
const db = require('../../db/');

const registerCustomer = async(customer) => {
    
};

// GET /api/customers to get an array of all customers

customersRouter.get('/', (req, res, next) => {
    db.query('SELECT * FROM customer', (err, result) => {
        if (err) {
          return next(err);
        }
        res.send(result.rows);
    });
});

// POST /api/customers to create a new customer and save it to the database

customersRouter.post('/register', (req, res, next) => {
    const customer = req.body;
    const text = 'INSERT INTO customer (first_name, last_name, gender, date_of_birth, street_address, city, state, zip_code, email, phone) \
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) \
    RETURNING id';
    const values = [customer.firstName, customer.lastName, customer.gender, customer.dob, customer.streetAddress, customer.city, customer.state, customer.zip, customer.email, customer.phone];
    db.query(text, values, (err, result) => {
        if (err) {
          return next(err);
        }
        if (customer) {
            res.status(201).send(result.rows);
        }
        else {
            res.status(400).send('Bad Request');
        }
    });
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

customersRouter.get('/:customerId', (req, res, next) => {
    const customer = getFromDatabaseById('customers', req.customerId);
    res.send(customer);
});

// PUT /api/customers/:customerId to update a single customer by id

customersRouter.put('/:customerId', (req, res, next) => {
    const updatedCustomer = updateInstanceInDatabase('customers', req.body);
    res.send(updatedCustomer);
});

// DELETE /api/customers/:customerId to delete a single customer by id

customersRouter.delete('/:customerId', (req, res, next) => {
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