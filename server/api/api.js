const express = require('express');
const apiRouter = express.Router();
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartsRouter);

module.exports = apiRouter;