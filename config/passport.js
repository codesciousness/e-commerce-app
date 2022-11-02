const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = (passport) => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    const text = 'SELECT * FROM users WHERE username=$1';
    const values = [username];
    try {
      const { rows } = await db.query(text, values);
      if (!rows.length) return done(null, false, {message: 'Incorrect login credentials.'});
      if (rows.length) {
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, {message: 'Incorrect login credentials.'});
        return done(null, user);
      };
    }
    catch(err) {
      return done(err, false, {message: 'Internal Server Error'});
    }
  }));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
    proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
    const userId = uuidv4();
    const cartId = uuidv4();
    const googleId = profile.id;
    const username = profile.displayName.replace(' ', '').toLowerCase() + profile.id.slice(profile.id.length - 6);
    const password = username;
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const findText = 'SELECT * FROM users WHERE email=$1';
    const findValues = [email];
    const addText = `INSERT INTO users (user_id, google_id, cart_id, username, password, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;
    const saltRounds = 10;
    try {
      const { rows } = await db.query(findText, findValues);
      if (rows.length) {
        const user = rows[0];
        return done(null, user);
      };
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);
      const addValues = [userId, googleId, cartId, username, passwordHash, firstName, lastName, email];
      const result = await db.query(addText, addValues);
      const newUser = result.rows[0];
      return done(null, newUser);
    }
    catch(err) {
      return done(err, false, {message: 'Internal Server Error'});
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
    
  passport.deserializeUser((id, done) => {
    const text = 'SELECT * FROM users WHERE user_id=$1';
    const values = [id];
    db.query(text, values, (err, result) => {
      if (err) {
        return done(err, false, {message: 'Internal Server Error'});
      }
      const user = result.rows[0];
      done(null, user);
    });
  });
};