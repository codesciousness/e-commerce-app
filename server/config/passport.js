const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const keys = require('./keys');

module.exports = (passport) => {
  passport.use(new LocalStrategy((username, password, done) => {
    const text = 'SELECT id, username, password FROM users WHERE username=$1';
    const values = [username];
    db.query(text, values, (err, result) => {
      if(err) {
        console.log(err.message);
        return done(err);
      }
  
      if(result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if(isMatch) {
            done(null, { id: user.id, username: user.username});
          }
          else {
            done(null, false, {message: 'Incorrect password'});
          }
        });
      }
      else {
        done(null, false, {message: 'Username does not exist'});
      }
    });
  }));

  passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    const userId = uuidv4();
    const googleId = profile.id;
    const username = profile.displayName;
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const findText = 'SELECT * FROM users WHERE email=$1';
    const findValues = [email];
    const addText = `INSERT INTO users (id, google_id, username, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
    const addValues = [userId, googleId, username, firstName, lastName, email];
    db.query(findText, findValues, (err, result) => {
      if (err) {
        console.log(err.message);
        return done(err);
      }

      if(result.rows.length > 0) {
        const user = result.rows[0];
        console.log(`User is ${user}`);
        done(null, user);
      }
      else {
        db.query(addText, addValues, (err, result) => {
          if (err) {
            console.log(err.message);
            return done(err);
          }
          const newUser = result.rows[0];
          console.log(`New user is ${newUser}`);
          done(null, newUser);
        });
      } 
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
    
  passport.deserializeUser((id, done) => {
    const text = 'SELECT * FROM users WHERE id=$1';
    const values = [id];
    db.query(text, values, (err, result) => {
      if(err) {
        console.log(err.message);
        return done(err);
      }
      if(result.rows.length > 0) {
        const user = result.rows[0];
        done(null, user);
      }
    });
  });
};