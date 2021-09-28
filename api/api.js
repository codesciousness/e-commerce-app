const express = require('express');
const apiRouter = express.Router();
const customersRouter = require('./routes/customers');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

apiRouter.use('/customers', customersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartsRouter);

module.exports = apiRouter;