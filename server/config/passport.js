const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        const text = 'SELECT id, username, password FROM customer WHERE username=$1';
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
            done(null, false, {message: 'Username dooes not exist'});
           }
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        const { username } = req.body;
        const text = 'SELECT id, username FROM customer WHERE username=$1';
        const values = [username];
        db.query(text, [parseInt(id, 10)], (err, results) => {
          if(err) {
            console.log(err);
            return done(err);
          }
      
          done(null, results.rows[0]);
        });
    });
};