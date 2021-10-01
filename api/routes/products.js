const express = require('express');
const productsRouter = express.Router();
const db = require('../../db');

// GET /api/products to get an array of all products

productsRouter.get('/', (req, res, next) => {
  db.query('SELECT * FROM product', (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.rows);
  });
});

module.exports = productsRouter;