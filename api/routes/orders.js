const express = require('express');
const ordersRouter = express.Router();
const db = require('../../db');

// GET /api/orders to get an array of all orders

ordersRouter.get('/', (req, res) => {
    const orders = db.query('SELECT * FROM orders', [req.params.id], (err, result) => {
        if (err) {
          return next(err);
        }
        res.send(result.rows[0]);
    });
});

module.exports = ordersRouter;