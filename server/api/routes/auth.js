const express = require('express');
const authRouter = express.Router();
const db = require('../../db/queries');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../util/jwt');
require('dotenv').config();

authRouter.post('/login', passport.authenticate('local', { successRedirect: process.env.AUTH_SUCCESS_REDIRECT, failureRedirect: process.env.AUTH_FAILURE_REDIRECT, failureFlash: true }), (req, res, next) => {
    const user = req.user;
    console.log(user);
    const token = generateAccessToken({ user: user });
    res.json(token);
});

authRouter.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect(process.env.AUTH_FAILURE_REDIRECT);
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/redirect', passport.authenticate('google', { successRedirect: process.env.AUTH_SUCCESS_REDIRECT, failureRedirect: process.env.AUTH_FAILURE_REDIRECT }), (req, res) => {
    const user = req.user;
    console.log(user);
    const token = generateAccessToken({ user: user });
    res.json(token);
});

module.exports = authRouter;