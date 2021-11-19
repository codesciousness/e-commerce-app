const express = require('express');
const cartRouter = express.Router({ mergeParams: true });
const db = require('../../db/queries');

// GET /cart to return cart products of a single user

cartRouter.get('/', db.getCart);

// PUT /cart/update to update cart products

cartRouter.put('/update', db.updateCart);

// DELETE /cart/remove to delete a cart product by id

cartRouter.delete('/remove', db.deleteCartItem);

module.exports = cartRouter;