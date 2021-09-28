const express = require('express');
const cartsRouter = express.Router();
const db = require('../../db');

// GET /api/carts to get an array of all carts

cartsRouter.get('/', (req, res) => {
    const carts = db.query('SELECT * FROM carts', [req.params.id], (err, result) => {
        if (err) {
          return next(err);
        }
        res.send(result.rows[0]);
    });
});

module.exports = cartsRouter;