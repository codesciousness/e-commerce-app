const express = require('express');
const customersRouter = express.Router();
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');
const db = require('../../db/');
const passport = require('passport');

// GET /api/customers to get an array of all customers

customersRouter.get('/', (req, res, next) => {
    db.query('SELECT * FROM customer', (err, result) => {
        if (err) {
          return next(err);
        }
        res.send(result.rows);
    });
});

customersRouter.get('/register', (req, res, next) => {
    res.send('Register');
});

// POST /api/customers to create a new customer and save it to the database

customersRouter.post('/register', (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
    const text = 'INSERT INTO customer (username, password, first_name, last_name, email) \
    VALUES ($1, $2, $3, $4, $5) \
    RETURNING *';
    const values = [username, password, firstName, lastName, email];
    db.query(text, values, (err, result) => {
        const newCustomer = result.rows[0];
        if (err) {
          return next(err);
        }
        if (newCustomer) {
            res.status(201).send(newCustomer);
        }
        else {
            res.status(400).send('Bad Request');
        }
    });
});

customersRouter.get('/login', (req, res, next) => {
    res.send('Login');
});

// POST /api/customers to login a customer

customersRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true })(req, res, next);
    /*const user = req.body;
    console.log(user);
    res.json(user);*/
});

customersRouter.get('/dashboard', (req, res, next) => {
    res.send('Dashboard');
});

customersRouter.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

//customerId param

customersRouter.param('customerId', (req, res, next, id) => {
    const customerId = id;
    const text = 'SELECT * FROM customer WHERE id = $1';
    const values = [customerId];
    db.query(text, values, (err, result) => {
        if (err) {
          return next(err);
        }
        if (result) {
            req.customerId = customerId;
            next();
        }
        else {
            res.status(404).send('Not Found');
        }
    });
});

// GET /api/customers/:customerId to get a single customer by id

customersRouter.get('/:customerId', (req, res) => {
    const text = 'SELECT * FROM customer WHERE id = $1';
    const values = [req.customerId];
    db.query(text, values, (err, result) => {
        const customer = result.rows[0];
        res.send(customer);
    });
});

// PUT /api/customers/:customerId to update a single customer by id

customersRouter.put('/:customerId', (req, res) => {
    const { username, password, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone } = req.body;
    const text = 'UPDATE customer \
    SET username = $2, password = $3, first_name = $4, last_name = $5, gender = $6, date_of_birth = $7, street_address = $8, city = $9, state = $10, zip_code = $11, email = $12, phone = $13 \
    WHERE id = $1 \
    RETURNING *';
    const values = [req.customerId, username, password, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone];
    db.query(text, values, (err, result) => {
        const updatedCustomer = result.rows[0];
        if (updatedCustomer) {
            res.status(201).send(updatedCustomer);
        }
        else {
            res.status(400).send('Bad Request');
        }
    });
});

// DELETE /api/customers/:customerId to delete a single customer by id

customersRouter.delete('/:customerId', (req, res) => {
    const text = 'DELETE FROM customer WHERE id = $1';
    const values = [req.customerId];
    db.query(text, values, (err, result) => {
        const deletedCustomer = db.query('SELECT * FROM customer WHERE id = $1', (err, result) => result);
        if (deletedCustomer === undefined) {
            res.status(204).send();
        }
        else {
            res.status(404).send('Not Found');
        }
    });
});

customersRouter.use('/:customerId/cart', cartsRouter);
customersRouter.use('/:customerId/orders', ordersRouter);

module.exports = customersRouter;