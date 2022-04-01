const express = require('express');
const productsRouter = express.Router();
const db = require('../../db/queries');

// GET /products to get an array of all products

productsRouter.get('/', db.getProducts);

// GET /products/:productId to get a single product by id

productsRouter.get('/:productId', db.getProductById);

module.exports = productsRouter;