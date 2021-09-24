const express = require('express');
const apiRouter = express.Router();
const customersRouter = require('./customers');
const productsRouter = require('./products');
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');

apiRouter.use('/customers', customersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.use('/orders', ordersRouter);

module.exports = apiRouter;