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

const getProducts = (req, res, next) => {
    let category;
    const input = req.query.category;
    const sortOption = req.query.sort;
    const categories = ['automotive', 'beauty', 'books', 'computers', 'electronics', 'games', 'grocery', 'health', 'home', 'kids', 'sports', 'tools', 'toys'];
    if (categories.includes(input)) {
        category = input[0].toUpperCase() + input.slice(1);
    }
    if (category) {
        if (!sortOption) {
            pg.query('SELECT * FROM product WHERE category = $1', [category], (err, result) => {
                if (err) {
                    return next(err);
                }
                res.send(result.rows);
            });
        }
        else if (sortOption === 'lowest') {
            pg.query('SELECT * FROM product WHERE category = $1 ORDER BY sell_price', [category], (err, result) => {
                if (err) {
                    return next(err);
                }
                res.send(result.rows);
            });
        }
        else if (sortOption === 'highest') {
            pg.query('SELECT * FROM product WHERE category = $1 ORDER BY sell_price DESC', [category], (err, result) => {
                if (err) {
                    return next(err);
                }
                res.send(result.rows);
            });
        }
        else {
            res.status(400).send('Bad Request');
        }
    }
    if (!category) {
        if (!sortOption) {
            pg.query('SELECT * FROM product', (err, result) => {
                if (err) {
                    return next(err);
                }
                res.send(result.rows);
            });
        }
        else if (sortOption === 'lowest') {
            pg.query('SELECT * FROM product ORDER BY sell_price', (err, result) => {
                if (err) {
                    return next(err);
                }
                res.send(result.rows);
            });
        }
        else if (sortOption === 'highest') {
            pg.query('SELECT * FROM product ORDER BY sell_price DESC', (err, result) => {
                if (err) {
                    return next(err);
                }
                res.send(result.rows);
            });
        }
        else {
            res.status(400).send('Bad Request');
        }
    }
    
};

const getProductById = (req, res, next, id) => {
    const productId = id;
    const text = 'SELECT * FROM product WHERE id = $1';
    const values = [productId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (result) {
            const product = result.rows[0];
            res.send(product);
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};

const getCart = (req, res, next) => {
    const text = `SELECT cart_id, product_id, name, cart_quantity, sell_price
    FROM cart_products
    JOIN product
    ON cart_products.product_id = product.id
    WHERE cart_id = $1`;
    const values = [req.userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        res.send(result.rows);
    });
};

const updateCart = (req, res, next) => {
    const { cartId, productId, cartQuantity } = req.body;
    if (cartQuantity <= 0) {
        res.redirect(`/users/${req.userId}/cart/remove`);
    }
    const text = `UPDATE cart_products
    SET cart_quantity = $3
    WHERE cart_id = $1 AND product_id = $2
    RETURNING *`;
    const values = [req.userId, productId, cartQuantity];
    console.log(req.userId, productId, cartQuantity);
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        const updatedCart = result.rows[0];
        if (updatedCart) {
            res.status(201).send(updatedCart);
        }
        else {
            res.status(400).send('Bad Request');
        }
    });
};

const deleteCartItem = (req, res, next) => {
    const { productId } = req.body;
    const text = 'DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2';
    const values = [req.userId, productId];
    pg.query(text, values, (err, result) => {
        const deletedItem = pg.query('SELECT * FROM cart_products WHERE cart_id = $1 AND product_id = $2', (err, result) => result);
        if (err) {
            return next(err);
        }
        if (deletedItem === undefined) {
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
    setUserId,
    getUserById,
    updateUser,
    deleteUser,
    getProducts,
    getProductById,
    getCart,
    updateCart,
    deleteCartItem
};