const express = require('express');
const ordersRouter = express.Router({ mergeParams: true });
const db = require('../../db/queries');

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  }
  else res.redirect('/auth/login');
};

ordersRouter.use(authenticate);

// GET /orders to get an array of all orders for a single user

ordersRouter.get('/', db.getOrders);

//orderId param

ordersRouter.param('orderId', db.setOrderId);

// GET /orders/:orderId to get a single order by id

ordersRouter.get('/:orderId', db.getOrderById);

// DELETE /orders/:orderId to delete a single order by id

ordersRouter.delete('/:orderId', db.deleteOrder);

module.exports = ordersRouter;