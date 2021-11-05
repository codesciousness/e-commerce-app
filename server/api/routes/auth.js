const express = require('express');
const authRouter = express.Router();
const db = require('../../db/queries');
const passport = require('passport');

authRouter.get('/login', (req, res) => {
    res.send('Login');
});

authRouter.post('/login', db.loginUser);

authRouter.get('/logout', db.logoutUser);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
});

module.exports = authRouter;