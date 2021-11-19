const express = require('express');
const authRouter = express.Router();
const db = require('../../db/queries');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../util/jwt');

authRouter.get('/login', (req, res) => {
    res.send('Please login');
});

authRouter.post('/login', passport.authenticate('local', { successRedirect: '/users/profile', failureRedirect: '/auth/login', failureFlash: true }), (req, res, next) => {
    const user = req.user;
    console.log(user);
    const token = generateAccessToken({ user: user });
    res.json(token);
});

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/users/profile');
});

module.exports = authRouter;