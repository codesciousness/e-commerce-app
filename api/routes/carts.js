const express = require('express');
const cartsRouter = express.Router();
const db = require('../../db');

// GET /api/carts to get an array of all carts

cartsRouter.get('/', (req, res, next) => {
  db.query('SELECT * FROM cart', (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.rows);
  });
});

module.exports = cartsRouter;