const express = require('express');
const ordersRouter = express.Router({ mergeParams: true });
const db = require('../../db');

// GET /orders to get an array of all orders for a single user

ordersRouter.get('/', (req, res, next) => {
  db.query('SELECT * FROM orders', (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.rows);
  });
});

module.exports = ordersRouter;