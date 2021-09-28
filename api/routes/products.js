const express = require('express');
const productsRouter = express.Router();
const db = require('../../db');

// GET /api/products to get an array of all products

productsRouter.get('/', (req, res) => {
    const products = db.query('SELECT * FROM products', [req.params.id], (err, result) => {
        if (err) {
          return next(err);
        }
        res.send(result.rows[0]);
    });
});

module.exports = productsRouter;