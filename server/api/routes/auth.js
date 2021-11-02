const express = require('express');
const authRouter = express.Router();
const db = require('../../db/queries');

authRouter.get('/login', (req, res, next) => {
    res.send('Login');
});

authRouter.post('/login', db.loginUser);

authRouter.get('/logout', db.logoutUser);

module.exports = authRouter;