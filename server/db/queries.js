const pg = require('./index');
const bcrypt = require('bcrypt');

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
    const saltRounds = 10;
    const findText = 'SELECT * FROM users WHERE email=$1';
    const values1 = [email];
    const addText = `INSERT INTO users (username, password, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
    pg.query(findText, values1, (err, result) => {
        if (err) {
          console.log(err.message);
          return done(err);
        }
  
        if(result.rows.length > 0) {
          const user = result.rows[0];
          res.send(`Email address: ${user.email} is already registered. Please Login.`);
        }
        else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if (err) {
                    throw err;
                }
                else {
                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err) {
                            throw err;
                        }
                        else {
                            const passwordHash = hash;
                            const values2 = [username, passwordHash, firstName, lastName, email];
                            pg.query(addText, values2, (err, result) => {
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
                        }
                    });
                };
            });
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
        //check to make sure that the user has been deleted
        pg.query('SELECT * FROM users WHERE id = $1', (err, result) => {
            if (err) {
                return next(err);
            }
            if (result.rows.length === 0) {
                res.status(204).send();
            }
            else {
                res.status(500).send('Internal Server Error');
            }
        });
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
        if (result.rows.length > 0) {
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
    if (cartQuantity === 0) {
        const text1 = 'DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2';
        const values1 = [req.userId, productId];
        pg.query(text1, values1, (err, result) => {
            //check to make sure that item has been deleted
            pg.query('SELECT * FROM cart_products WHERE cart_id = $1 AND product_id = $2', (err, result) => {
                if (err) {
                    return next(err);
                }
                if (result.rows.length === 0) {
                    res.status(204).send();
                }
                else {
                    res.status(500).send('Internal Server Error');
                }
            });
        });
    }
    else if (cartQuantity > 0) {
        const text2 = `UPDATE cart_products
        SET cart_quantity = $3
        WHERE cart_id = $1 AND product_id = $2
        RETURNING *`;
        const values2 = [req.userId, productId, cartQuantity];
        pg.query(text2, values2, (err, result) => {
            if (err) {
                return next(err);
            }
            
            if (result.rows.length > 0) {
                const updatedCart = result.rows[0];
                res.status(201).send(updatedCart);
            }
            else {
                //check to see if user exists
                pg.query('SELECT * FROM users WHERE id = $1', [req.userId], (err, result) => {
                    if (err) {
                        return next(err);
                    }
                    if (result.rows.length > 0) {
                        //check to see if product exists
                        pg.query('SELECT * FROM product WHERE id = $1', [productId], (err, result) => {
                            if (err) {
                                return next(err);
                            }
                            if (result.rows.length > 0) {
                                //add the new cart item
                                const text3 = `INSERT INTO cart_products (cart_id, product_id, cart_quantity)
                                VALUES ($1, $2, $3)
                                RETURNING *`;
                                pg.query(text3, values2, (err, result) => {
                                    if (err) {
                                        return next(err);
                                    }
                                    if (result.rows.length > 0) {
                                        const addedToCart = result.rows[0];
                                        res.status(201).send(addedToCart);
                                    }
                                    else {
                                        res.status(500).send('Internal Server Error');
                                    }
                                });
                            }
                            else res.status(400).send('Bad Request');
                        });
                    }
                    else res.status(400).send('Bad Request');
                });
            }
        });
    }
    else res.status(400).send('Bad Request');
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
};