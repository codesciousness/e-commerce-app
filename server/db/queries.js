const pg = require('./index');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

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
    if (!username || !password || !firstName || !lastName || !email) {
        return res.status(400).send('Please fill out all fields.');
    }
    if (password.length < 8) {
        return res.status(400).send('Password is too short. Please enter a minimum of 8 characters.');
    }
    const userId = uuidv4();
    const cartId = uuidv4();
    const saltRounds = 10;
    const findText = 'SELECT * FROM users WHERE email=$1';
    const findValues = [email];
    const addText = `INSERT INTO users (user_id, cart_id, username, password, first_name, last_name, email)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
    pg.query(findText, findValues, (err, result) => {
        if (err) {
        return next(err);
        }
        if (result.rows.length > 0) {
            const user = result.rows[0];
            return res.send(user);
        }
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
                        const addValues = [userId, cartId, username, passwordHash, firstName, lastName, email];
                        pg.query(addText, addValues, (err, result) => {
                            const newUser = result.rows[0];
                            if (err) {
                                return next(err);
                            }
                            if (!newUser) {
                                return res.status(500).send('Internal Server Error');
                            }
                            res.status(201).send(newUser);
                        });
                    }
                });
            };
        });
    });
};
  
const setUserId = (req, res, next, id) => {
    const userId = id;
    const text = 'SELECT * FROM users WHERE user_id = $1';
    const values = [userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(404).send('User not found.');
        }
        req.userId = userId;
        next();
    });
};
  
const getUserById = (req, res, next) => {
    const text = 'SELECT * FROM users WHERE user_id = $1';
    const values = [req.userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        const user = result.rows[0];
        res.send(user);
    });
};

const updateUser = (req, res, next) => {
    const { username, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone } = req.body.userProfile;
    console.log(req.body.userProfile);
    if (!username || !firstName || !lastName || !email) {
        return res.status(400).send('Please fill out all required fields.');
    }
    const text = `UPDATE users
    SET username = $2, first_name = $3, last_name = $4, gender = $5, date_of_birth = $6, street_address = $7, city = $8, state = $9, zip_code = $10, email = $11, phone = $12
    WHERE user_id = $1
    RETURNING *`;
    const values = [req.userId, username, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(500).send('Internal Server Error');
        }
        const updatedUser = result.rows[0];
        res.send(updatedUser);
    });
};

const changePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).send('Please enter a password.');
    }
    if (password.length < 8) {
        return res.status(400).send('Password is too short. Please enter a minimum of 8 characters.');
    }
    const text = `UPDATE users
    SET password = $2
    WHERE user_id = $1
    RETURNING *`;
    const saltRounds = 10;
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
                    const values = [req.userId, passwordHash];
                    pg.query(text, values, (err, result) => {
                        if (err) {
                            return next(err);
                        }
                        res.send();
                    });
                }
            });
        };
    });
};

const getProducts = (req, res, next) => {
    let category;
    const input = req.query.category;
    const sortOption = req.query.sort;
    const categories = ['Automotive', 'Beauty', 'Books', 'Electronics', 'Games', 'Garden', 'Grocery', 'Home', 'Fashion', 'Toys'];
    if (categories.includes(input)) {
        category = input;
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
    else {
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

const getProductById = (req, res, next) => {
    const { productId } = req.params;
    const text = 'SELECT * FROM product WHERE product_id = $1';
    const values = [productId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(404).send('Product not found.');
        }
        const product = result.rows[0];
        res.send(product);
    });
};

const setCartId = (req, res, next, id) => {
    const cartId = id;
    const userId = req.userId
    const text = 'SELECT * FROM users WHERE user_id = $1';
    pg.query(text, [userId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(404).send('User not found.');
        }
        const user = result.rows[0];
        if (user.cart_id !== cartId) {
            return res.status(400).send('Bad Request');
        }
        req.cartId = cartId;
        next();
    });
};

const getCartById = (req, res, next) => {
    const text = `SELECT cart_id, product_id, name, category, url, cart_quantity, sell_price, (cart_quantity * sell_price)::DECIMAL as item_total
    FROM cart
    JOIN product
    USING(product_id)
    WHERE cart_id = $1`;
    pg.query(text, [req.cartId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(404).send('Cart not found.');
        }
        const subtotal = Number(result.rows.reduce((prev, curr) => prev + Number(curr.item_total), 0).toFixed(2));
        const cart = {
            items: result.rows,
            subtotal,
        };
        res.send(cart);
    });
};

const updateCart = (req, res, next) => {
    const { productId, cartQuantity } = req.body;
    if (cartQuantity < 0) {
        return res.status(400).send('Bad Request');
    }
    else if (cartQuantity === 0) {
        const deleteText = 'DELETE FROM cart WHERE cart_id = $1 AND product_id = $2';
        const deleteValues = [req.cartId, productId];
        pg.query(deleteText, deleteValues, (err, result) => {
            if (err) {
                return next(err);
            }
            res.status(204).send();
        });
    }
    else if (cartQuantity > 0) {
        const updateText = `UPDATE cart
        SET cart_quantity = $3
        WHERE cart_id = $1 AND product_id = $2
        RETURNING *`;
        const updateValues = [req.cartId, productId, cartQuantity];
        pg.query(updateText, updateValues, (err, result) => {
            if (err) {
                return next(err);
            }
            if (result.rows.length > 0) {
                const updatedCart = result.rows[0];
                return res.send(updatedCart);
            }
            //check to see if product exists
            pg.query('SELECT * FROM product WHERE product_id = $1', [productId], (err, result) => {
                if (err) {
                    return next(err);
                }
                if (!result.rows.length) {
                    return res.status(400).send('Bad Request');
                }
                //add the new cart item
                const insertText = `INSERT INTO cart (cart_id, product_id, cart_quantity)
                VALUES ($1, $2, $3)
                RETURNING *`;
                pg.query(insertText, updateValues, (err, result) => {
                    if (err) {
                        return next(err);
                    }
                    if (!result.rows.length) {
                        return res.status(500).send('Internal Server Error');
                    }
                    const addedToCart = result.rows[0];
                    res.send(addedToCart);
                });
            });
        });
    }
};

const checkout = (req, res, next) => {
    const userId = req.userId;
    const { paySuccess, payMethod, cardNum, cardExp, cardCVV } = req.body.payment;
    const { shipToName, shipToStreet, shipToCity, shipToState, shipToZip, email } = req.body.address;
    if (!userId) {
        return res.status(400).send('User not signed in.');
    }
    if (!shipToName || !shipToStreet || !shipToCity || !shipToState || !shipToZip || !email) {
        return res.status(400).send('Please enter a valid shipping and email address.');
    }
    //verify that payment succeeded
    if (!paySuccess) {
        return res.status(400).send('Payment was not successful.');
    }
    //query items and verify cart is not empty
    const findText = `SELECT cart_id, product_id, cart_quantity, sell_price, (cart_quantity * sell_price)::DECIMAL as item_total
    FROM cart
    JOIN product
    USING(product_id)
    WHERE cart_id = $1`;
    pg.query(findText, [req.cartId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(404).send('Cart not found.');
        }
        const date = new Date(),
        items = result.rows,
        subtotal = result.rows.reduce((prev, curr) => prev + Number(curr.item_total), 0),
        tax = subtotal * 0.0825,
        shipping = 9.99,
        //calculate order total
        total = subtotal + tax + shipping;
        let orderId;
        const order = {
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            items,
            subtotal: Number(subtotal.toFixed(2)),
            tax: Number(tax.toFixed(2)),
            shipping,
            total: Number(total.toFixed(2)),
            address: {
                shipToName,
                shipToStreet,
                shipToCity,
                shipToState,
                shipToZip,
                email
            },
            payment: {
                payMethod,
                cardNum: cardNum.slice(cardNum.length - 4),
            }
        };
        //process order by adding rows into the order & order_details tables
        const ordersText = `INSERT INTO orders (date, status, total, ship_date, shipto_name, shipto_street, shipto_city, shipto_state, shipto_zipcode, email, pay_method, card_num, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *`,
        ordersValues = [order.date, 'processing', order.total, null, shipToName, shipToStreet, shipToCity, shipToState, shipToZip, email, payMethod, order.payment.cardNum, userId];
        pg.query(ordersText, ordersValues, (err, result) => {
            if (err) {
                return next(err);
            }
            if (!result.rows.length) {
                return res.status(500).send('Internal Server Error');
            }
            const processedOrder = result.rows[0];
            orderId = processedOrder.id;
            const orderDetailsText = `INSERT INTO order_details (order_id, product_id, order_quantity, item_price)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
            let itemsAdded = 0;
            order.items.forEach(item => {
                let orderDetailsValues = [orderId, item.product_id, item.cart_quantity, item.sell_price];
                pg.query(orderDetailsText, orderDetailsValues, (err, result) => {
                    if (err) {
                        return next(err);
                    }
                    if (!result.rows.length) {
                        return res.status(500).send('Internal Server Error');
                    }
                    itemsAdded++;
                    if (itemsAdded === order.items.length) {
                        const orderDetText = `SELECT order_id, product_id, name, order_quantity, item_price, (order_quantity * item_price)::DECIMAL as item_total
                        FROM order_details
                        JOIN product
                        USING(product_id)
                        WHERE order_id = $1`;
                        const orderDetValues = [orderId];
                        pg.query(orderDetText, orderDetValues, (err, result) => {
                            if (err) {
                                return next(err);
                            }
                            const orderDetails = result.rows;
                            const clearCartText = 'DELETE FROM cart WHERE cart_id = $1';
                            pg.query(clearCartText, [req.cartId], (err, result) => {
                                if (err) {
                                    return next(err);
                                }
                                const completedOrder = {
                                    processedOrder,
                                    orderDetails
                                };
                                res.send(completedOrder);
                            });
                        });
                    }
                });
            });
        });
    });
};

const getOrders = (req, res, next) => {
    const values = [req.userId];
    const sortOption = req.query.sort;
    const noSortText = `SELECT *
    FROM orders
    LEFT JOIN (
    SELECT DISTINCT on (order_id) * FROM order_details
    ORDER BY order_id
    ) as order_details
    USING(order_id)
    LEFT JOIN product
    USING(product_id)
    WHERE user_id = $1`;
    const sortOldText = noSortText + ' ORDER BY date';
    const sortNewText = sortOldText + ' DESC';
    if (!sortOption) {
        pg.query(noSortText, values, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows);
        });
    }
    else if (sortOption === 'oldest') {
        pg.query(sortOldText, values, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows);
        });
    }
    else if (sortOption === 'newest') {
        pg.query(sortNewText, values, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows);
        });
    }
    else {
        res.status(400).send('Bad Request');
    }
};

const setOrderId = (req, res, next, id) => {
    const orderId = id;
    const text = 'SELECT * FROM orders WHERE order_id = $1 AND user_id = $2';
    const values = [orderId, req.userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(404).send('User not found.');
        }
        req.orderId = orderId;
        next();
    });
};

const getOrderById = (req, res, next) => {
    const ordersText = `SELECT *
    FROM orders
    LEFT JOIN (
    SELECT DISTINCT on (order_id) * FROM order_details
    ORDER BY order_id
    ) as order_details
    USING(order_id)
    LEFT JOIN product
    USING(product_id)
    WHERE order_id = $1 AND user_id = $2`;
    const ordersValues = [req.orderId, req.userId];
    pg.query(ordersText, ordersValues, (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result.rows.length) {
            return res.status(404).send('Order not found.');
        }
        const summary = result.rows[0];
        const orderDetailsText = `SELECT order_id, product_id, name, url, order_quantity, item_price, (order_quantity * item_price)::DECIMAL as item_total
        FROM order_details
        JOIN product
        USING(product_id)
        WHERE order_id = $1`;
        const orderDetailsValues = [req.orderId];
        pg.query(orderDetailsText, orderDetailsValues, (err, result) => {
            if (err) {
                return next(err);
            }
            const items = result.rows;
            const order = {
                summary,
                items
            };
            res.send(order);
        });
    });
};

const deleteOrder = (req, res, next) => {
    const orderDetailsText = 'DELETE FROM order_details WHERE order_id = $1';
    const orderDetailsValues = [req.orderId];
    pg.query(orderDetailsText, orderDetailsValues, (err, result) => {
        if (err) {
            return next(err);
        }
        const ordersText = 'DELETE FROM orders WHERE order_id = $1 AND user_id = $2';
        const ordersValues = [req.orderId, req.userId];
        pg.query(ordersText, ordersValues, (err, result) => {
            if (err) {
                return next(err);
            }
            res.status(204).send();
        });
    });
};

module.exports = {
    getUsers,
    registerUser,
    setUserId,
    getUserById,
    updateUser,
    changePassword,
    getProducts,
    getProductById,
    setCartId,
    getCartById,
    updateCart,
    checkout,
    getOrders,
    setOrderId,
    getOrderById,
    deleteOrder,
};