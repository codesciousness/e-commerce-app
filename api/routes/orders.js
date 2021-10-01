const express = require('express');
const ordersRouter = express.Router();
const db = require('../../db');

// GET /api/orders to get an array of all orders

ordersRouter.get('/', (req, res, next) => {
  db.query('SELECT * FROM orders', (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.rows);
  });
});

module.exports = ordersRouter;