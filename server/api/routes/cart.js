const express = require('express');
const cartRouter = express.Router({ mergeParams: true });
const db = require('../../db/queries');

// GET /cart to return cart products of a single user

cartRouter.get('/', db.getCart);

// PUT /cart to update cart products

cartRouter.put('/', db.updateCart);

module.exports = cartRouter;