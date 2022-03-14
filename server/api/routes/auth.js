const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../util/jwt');
require('dotenv').config();

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        const { username, password } = req.body;
        if (!username || !password) {
            info.message = 'Please fill out all fields.';
        }
        if (!user) {
            return res.status(401).send(info.message);
        }
        req.logIn(user, err => {
            if (err) return next(err);
        });
        const token = generateAccessToken({ user: user });
        res.send(user);
        //res.json(token);
    })(req, res, next);
});

authRouter.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.send();
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/redirect', passport.authenticate('google', { successRedirect: process.env.AUTH_SUCCESS_REDIRECT, failureRedirect: process.env.AUTH_FAILURE_REDIRECT }), (req, res) => {
    const user = req.user;
    const token = generateAccessToken({ user: user });
    res.send(user);
    //res.json(token);
});

module.exports = authRouter;