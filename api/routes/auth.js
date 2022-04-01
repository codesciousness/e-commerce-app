const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const db = require('../../db/queries');

authRouter.post('/login', db.loginUser);

authRouter.get('/logout', db.logoutUser);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/redirect', passport.authenticate('google', { successRedirect: process.env.AUTH_SUCCESS_REDIRECT, failureRedirect: process.env.AUTH_FAILURE_REDIRECT }));

authRouter.get('/session', db.getSession);

module.exports = authRouter;