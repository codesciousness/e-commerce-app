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
    if (username && password && firstName && lastName && email) {
        const userId = uuidv4();
        const saltRounds = 10;
        const findText = 'SELECT * FROM users WHERE email=$1';
        const findValues = [email];
        const addText = `INSERT INTO users (id, username, password, first_name, last_name, email)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
        pg.query(findText, findValues, (err, result) => {
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
                                const addValues = [userId, username, passwordHash, firstName, lastName, email];
                                pg.query(addText, addValues, (err, result) => {
                                    const newUser = result.rows[0];
                                    if (err) {
                                        return next(err);
                                    }
                                    if (newUser) {
                                        res.status(201).send(newUser);
                                    }
                                    else {
                                        res.status(500).send('Internal Server Error');
                                    }
                                });
                            }
                        });
                    };
                });
            } 
        });
    }
    else {
        done(null, false, {message: 'Please fill out all required fields.'});
    };
};
  
const setUserId = (req, res, next, id) => {
    const userId = id;
    const text = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.rows.length > 0) {
            req.userId = userId;
            next();
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};
  
const getUserById = (req, res, next) => {
    const text = 'SELECT * FROM users WHERE id = $1';
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
    const { username, password, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone } = req.body;
    const text = `UPDATE users
    SET username = $2, password = $3, first_name = $4, last_name = $5, gender = $6, date_of_birth = $7, street_address = $8, city = $9, state = $10, zip_code = $11, email = $12, phone = $13
    WHERE id = $1
    RETURNING *`;
    const values = [req.userId, username, password, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        const updatedUser = result.rows[0];
        if (updatedUser) {
            res.send(updatedUser);
        }
        else {
            res.status(500).send('Internal Server Error');
        }
    });
};

const getProducts = (req, res, next) => {
    let category;
    const input = req.query.category;
    const sortOption = req.query.sort;
    const categories = ['Automotive', 'Beauty', 'Books', 'Computers', 'Electronics', 'Games', 'Grocery', 'Health', 'Home', 'Kids', 'Sports', 'Tools', 'Toys'];
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

const createCart = (req, res, next) => {
    const cartId = uuidv4();
    const userId = req.userId ? req.userId : req.body.userId ? req.body.userId : null;
    console.log (userId);
    const text = `INSERT INTO cart (id, users_id)
    VALUES ($1, $2)
    RETURNING *`;
    pg.query(text, [cartId, userId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.rows.length > 0) {
            res.status(201).send(result.rows);
        }
        else res.status(500).send('Internal Server Error');
    });
};

const setCartId = (req, res, next, id) => {
    const cartId = id;
    const text = 'SELECT * FROM cart WHERE id = $1';
    pg.query(text, [cartId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.rows.length > 0) {
            req.cartId = cartId;
            next();
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};

const getCartById = (req, res, next) => {
    const text = `SELECT cart_id, product_id, name, category, cart_quantity, sell_price, (cart_quantity * sell_price)::DECIMAL as item_total
    FROM cart_products
    JOIN product
    ON cart_products.product_id = product.id
    WHERE cart_id = $1`;
    pg.query(text, [req.cartId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.rows.length > 0) {
            const subtotal = result.rows.reduce((prev, curr) => prev + Number(curr.item_total), 0);
            const cart = {
                items: result.rows,
                subtotal,
            };
            res.send(cart);
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};

const updateCart = (req, res, next) => {
    const { productId, cartQuantity } = req.body;
    if (cartQuantity === 0) {
        const deleteText = 'DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2';
        const deleteValues = [req.cartId, productId];
        pg.query(deleteText, deleteValues, (err, result) => {
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
        const updateText = `UPDATE cart_products
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
                res.send(updatedCart);
            }
            else {
                //check to see if cart exists
                pg.query('SELECT * FROM cart WHERE id = $1', [req.cartId], (err, result) => {
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
                                const insertText = `INSERT INTO cart_products (cart_id, product_id, cart_quantity)
                                VALUES ($1, $2, $3)
                                RETURNING *`;
                                pg.query(insertText, updateValues, (err, result) => {
                                    if (err) {
                                        return next(err);
                                    }
                                    if (result.rows.length > 0) {
                                        const addedToCart = result.rows[0];
                                        res.send(addedToCart);
                                    }
                                    else {
                                        res.status(500).send('Internal Server Error');
                                    }
                                });
                            }
                            else res.status(400).send('Bad Request');
                        });
                    }
                    else res.redirect('/cart');
                });
            }
        });
    }
    else res.status(400).send('Bad Request');
};

const checkout = (req, res, next) => {
    //verify cart is not empty
    const findText = `SELECT cart_id, product_id, cart_quantity
    FROM cart_products
    WHERE cart_id = $1`;
    pg.query(findText, [req.cartId], (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.rows.length > 0) {
            //obtain shipping address & payment method from req.body
            const { shipToName, shipToStreet, shipToCity, shipToState, shipToZip, email } = req.body.address;
            const { paySuccess, payMethod, cardNum, cardExp, cardCVV } = req.body.payment;
            //verify that shipping address, email and payment method have values
            if (shipToName && shipToStreet && shipToCity && shipToState && shipToZip && email && paySuccess) {
                //query items from cart products
                const joinText = `SELECT cart_id, product_id, name, cart_quantity, sell_price, (cart_quantity * sell_price)::DECIMAL as item_total
                FROM cart_products
                JOIN product
                ON cart_products.product_id = product.id
                WHERE cart_id = $1`;
                pg.query(joinText, [req.cartId], (err, result) => {
                    if (err) {
                        return next(err);
                    }
                    if (result.rows.length > 0) {
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
                        const ordersText = `INSERT INTO orders (date, status, total, ship_date, shipto_name, shipto_street, shipto_city, shipto_state, shipto_zipcode, email, pay_method, card_num, users_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                        RETURNING *`,
                        ordersValues = [order.date, 'processing', order.total, null, shipToName, shipToStreet, shipToCity, shipToState, shipToZip, email, payMethod, order.payment.cardNum, req.userId];
                        pg.query(ordersText, ordersValues, (err, result) => {
                            if (err) {
                                return next(err);
                            }
                            if (result.rows.length > 0) {
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
                                            console.log(err.message);
                                            return next(err);
                                        }
                                        if (result.rows.length === 0) {
                                            res.status(500).send('Internal Server Error');
                                        }
                                        itemsAdded++;
                                        if (itemsAdded === order.items.length) {
                                            const orderDetText = `SELECT order_id, product_id, name, order_quantity, item_price, (order_quantity * item_price)::DECIMAL as item_total
                                            FROM order_details
                                            JOIN product
                                            ON order_details.product_id = product.id
                                            WHERE order_id = $1`;
                                            const orderDetValues = [orderId];
                                            pg.query(orderDetText, orderDetValues, (err, result) => {
                                                if (err) {
                                                    return next(err);
                                                }
                                                const orderDetails = result.rows;
                                                const clearCartText = 'DELETE FROM cart_products WHERE cart_id = $1';
                                                pg.query(clearCartText, [req.cartId], (err, result) => {
                                                    //check to make sure that the cart items have been deleted
                                                    pg.query('SELECT * FROM cart_products WHERE cart_id = $1', [req.cartId], (err, result) => {
                                                        if (err) {
                                                            return next(err);
                                                        }
                                                        if (result.rows.length !== 0) {
                                                            res.status(500).send('Internal Server Error');
                                                        }
                                                        const completedOrder = {
                                                            processedOrder,
                                                            orderDetails
                                                        };
                                                        res.send(completedOrder);
                                                    });
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                    else {
                        res.status(404).send('Not Found');
                    }
                });
            }
            else res.status(400).send('Bad Request');
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};

const getOrders = (req, res, next) => {
    const values = [req.userId];
    const sortOption = req.query.sort;
    if (!sortOption) {
        pg.query('SELECT * FROM orders WHERE users_id = $1', values, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows);
        });
    }
    else if (sortOption === 'oldest') {
        pg.query('SELECT * FROM orders WHERE users_id = $1 ORDER BY date', values, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows);
        });
    }
    else if (sortOption === 'newest') {
        pg.query('SELECT * FROM orders WHERE users_id = $1 ORDER BY date DESC', values, (err, result) => {
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
    const text = 'SELECT * FROM orders WHERE id = $1 AND users_id = $2';
    const values = [orderId, req.userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.rows.length > 0) {
            req.orderId = orderId;
            next();
        }
        else {
            res.status(404).send('Not Found');
        }
    });
};

const getOrderById = (req, res, next) => {
    const ordersText = 'SELECT * FROM orders WHERE id = $1 AND users_id = $2';
    const ordersValues = [req.orderId, req.userId];
    pg.query(ordersText, ordersValues, (err, result) => {
        if (err) {
            return next(err);
        }
        if (result.rows.length > 0) {
            const summary = result.rows[0];
            const orderDetailsText = `SELECT order_id, product_id, name, order_quantity, item_price, (order_quantity * item_price)::DECIMAL as item_total
            FROM order_details
            JOIN product
            ON order_details.product_id = product.id
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
        }
    });
};

const deleteOrder = (req, res, next) => {
    const orderDetailsText = 'DELETE FROM order_details WHERE order_id = $1';
    const orderDetailsValues = [req.orderId];
    pg.query(orderDetailsText, orderDetailsValues, (err, result) => {
        if (err) {
            return next(err);
        }
        //check to make sure that the order_detail rows have been deleted
        pg.query('SELECT * FROM order_details WHERE order_id = $1', orderDetailsValues, (err, result) => {
            if (err) {
                return next(err);
            }
            if (result.rows.length === 0) {
                const ordersText = 'DELETE FROM orders WHERE id = $1 AND users_id = $2';
                const ordersValues = [req.orderId, req.userId];
                pg.query(ordersText, ordersValues, (err, result) => {
                    if (err) {
                        return next(err);
                    }
                    //check to make sure that the order has been deleted
                    pg.query('SELECT * FROM orders WHERE id = $1 AND users_id = $2', ordersValues, (err, result) => {
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
            else {
                res.status(500).send('Internal Server Error');
            }
        });
    });
};

module.exports = {
    getUsers,
    registerUser,
    setUserId,
    getUserById,
    updateUser,
    getProducts,
    getProductById,
    createCart,
    setCartId,
    getCartById,
    updateCart,
    checkout,
    getOrders,
    setOrderId,
    getOrderById,
    deleteOrder,
};