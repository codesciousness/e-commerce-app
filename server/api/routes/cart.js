const express = require('express');
const cartRouter = express.Router();
const db = require('../../db/queries');

// POST /cart to create a new cart and save it to the database

cartRouter.post('/', db.createCart);

//cartId param

cartRouter.param('cartId', db.setCartId);

// GET /cart/:cartId to return products of a cart

cartRouter.get('/:cartId', db.getCartById);

// PUT /cart/:cartId to update cart products

cartRouter.put('/:cartId', db.updateCart);

// POST /cart/:cartId/checkout to create a new order and clear the cart

cartRouter.post('/:cartId/checkout', db.checkout);

module.exports = cartRouter;