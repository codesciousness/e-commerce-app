const pg = require('./index');
const passport = require('passport');

const getUsers = (req, res, next) => {
    pg.query('SELECT * FROM users', (err, result) => {
        if (err) {
            return next(err);
        }
        res.send(result.rows);
    });
};
  
const registerUser = (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
    const text = `INSERT INTO users (username, password, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
    const values = [username, password, firstName, lastName, email];
    pg.query(text, values, (err, result) => {
      const newUser = result.rows[0];
        if (err) {
            return next(err);
        }
        if (newUser) {
            res.status(201).send(newUser);
        }
        else {
            res.status(400).send('Bad Request');
        }
    });
};
  
const loginUser = (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true })(req, res, next);
        /*const user = req.body;
        console.log(user);
        res.json(user);*/
};
  
const logoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
};
  
const setUserId = (req, res, next, id) => {
    const userId = id;
    const text = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (result) {
            req.userId = userId;
            next();
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};
  
const getUserById = (req, res) => {
    const text = 'SELECT * FROM users WHERE id = $1';
    const values = [req.userId];
    pg.query(text, values, (err, result) => {
        const user = result.rows[0];
        res.send(user);
    });
};

const updateUser = (req, res) => {
    const { username, password, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone } = req.body;
    const text = `UPDATE users
    SET username = $2, password = $3, first_name = $4, last_name = $5, gender = $6, date_of_birth = $7, street_address = $8, city = $9, state = $10, zip_code = $11, email = $12, phone = $13
    WHERE id = $1
    RETURNING *`;
    const values = [req.userId, username, password, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone];
    pg.query(text, values, (err, result) => {
        const updatedUser = result.rows[0];
        if (updatedUser) {
            res.status(201).send(updatedUser);
        }
        else {
            res.status(400).send('Bad Request');
        }
    });
};

const deleteUser = (req, res) => {
    const text = 'DELETE FROM users WHERE id = $1';
    const values = [req.userId];
    pg.query(text, values, (err, result) => {
        const deletedUser = pg.query('SELECT * FROM users WHERE id = $1', (err, result) => result);
        if (deletedUser === undefined) {
            res.status(204).send();
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    logoutUser,
    setUserId,
    getUserById,
    updateUser,
    deleteUser
};