const pg = require('./index');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const { validateCard } = require('../util/credit-card');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../util/jwt');

const getUsers = (req, res) => {
    pg.query('SELECT * FROM users', (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(result.rows);
    });
};
  
const registerUser = async (req, res, next) => {
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
    try {
        const { rows } = await pg.query(findText, findValues);
        if (rows.length) {
            const user = rows[0];
            return res.status(400).send(`Email address: ${user.email} is already registered. Please login.`);
        };
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const addValues = [userId, cartId, username, passwordHash, firstName, lastName, email];
        await pg.query(addText, addValues);
        next();
    }
    catch(err) {
        return res.status(500).send('Internal Server Error');
    }
};

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).send('Internal Server Error');
        const { username, password } = req.body;
        if (!username || !password) {
            info.message = 'Please fill out all fields.';
        }
        if (!user) {
            return res.status(401).send(info.message);
        }
        req.logIn(user, err => {
            if (err) return res.status(500).send('Internal Server Error');
        });
        //const token = generateAccessToken({ user: user });
        //res.json(token);
        res.send(user);
    })(req, res, next);
};

const logoutUser = (req, res) => {
    req.logout();
    res.send();
};

const getSession = (req, res) => {
    if (!req.isAuthenticated() || !req.session) {
        res.status(401).send('Not Authorized.');
    }
    res.send(req.user);
};
  
const setUserId = (req, res, next, id) => {
    const userId = id;
    const text = 'SELECT * FROM users WHERE user_id = $1';
    const values = [userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (!result.rows.length) {
            return res.status(404).send('User not found.');
        }
        req.userId = userId;
        next();
    });
};
  
const getUserById = (req, res) => {
    const text = 'SELECT * FROM users WHERE user_id = $1';
    const values = [req.userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        const user = result.rows[0];
        res.send(user);
    });
};

const updateUser = (req, res) => {
    const { username, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone } = req.body.userProfile;
    if (!username || !firstName || !lastName || !email) {
        return res.status(400).send('Please fill out all required fields.');
    }
    const text = `UPDATE users
    SET username = $2, first_name = $3, last_name = $4, gender = $5, date_of_birth = $6, street_address = $7, city = $8, state = $9, zip_code = $10, email = $11, phone = $12
    WHERE user_id = $1
    RETURNING *`;
    const values = [req.userId, username, firstName, lastName, gender, dob, streetAddress, city, state, zip, email, phone];
    pg.query(text, values, (err, result) => {
        if (err || !result.rows.length) {
            return res.status(500).send('Internal Server Error');
        }
        const updatedUser = result.rows[0];
        res.send(updatedUser);
    });
};

const changePassword = async (req, res) => {
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
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const values = [req.userId, passwordHash];
        await pg.query(text, values);
        res.send();
    }
    catch(err) {
        return res.status(500).send('Internal Server Error');
    }
};

const getProducts = async (req, res) => {
    let category;
    const input = req.query.category;
    const sortOption = req.query.sort;
    const categories = ['Automotive', 'Beauty', 'Books', 'Electronics', 'Games', 'Garden', 'Grocery', 'Home', 'Fashion', 'Toys'];
    if (categories.includes(input)) category = input;
    try {
        if (category) {
            if (!sortOption) {
                const { rows } = await pg.query('SELECT * FROM product WHERE category = $1', [category]);
                res.send(rows);
            }
            else if (sortOption === 'lowest') {
                const { rows } = await pg.query('SELECT * FROM product WHERE category = $1 ORDER BY sell_price', [category]);
                res.send(rows);
            }
            else if (sortOption === 'highest') {
                const { rows } = await pg.query('SELECT * FROM product WHERE category = $1 ORDER BY sell_price DESC', [category]);
                res.send(rows);
            }
            else {
                res.status(400).send('Bad Request');
            }
        }
        else {
            if (!sortOption) {
                const { rows } = await pg.query('SELECT * FROM product');
                res.send(rows);
            }
            else if (sortOption === 'lowest') {
                const { rows } = await pg.query('SELECT * FROM product ORDER BY sell_price');
                res.send(rows);
            }
            else if (sortOption === 'highest') {
                const { rows } = await pg.query('SELECT * FROM product ORDER BY sell_price DESC');
                res.send(rows);
            }
            else {
                res.status(400).send('Bad Request');
            }
        }
    }
    catch(err) {
        return res.status(500).send('Internal Server Error');
    }
};

const getProductById = (req, res) => {
    const { productId } = req.params;
    const text = 'SELECT * FROM product WHERE product_id = $1';
    const values = [productId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
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
            return res.status(500).send('Internal Server Error');
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

const getCartById = (req, res) => {
    const text = `SELECT cart_id, product_id, name, category, url, cart_quantity, sell_price, (cart_quantity * sell_price)::DECIMAL as item_total
    FROM cart
    JOIN product
    USING(product_id)
    WHERE cart_id = $1`;
    pg.query(text, [req.cartId], (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
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

const updateCart = async (req, res) => {
    const { productId, cartQuantity } = req.body;
    try {
        if (cartQuantity < 0) {
            return res.status(400).send('Bad Request');
        }
        else if (cartQuantity === 0) {
            const deleteText = 'DELETE FROM cart WHERE cart_id = $1 AND product_id = $2';
            const deleteValues = [req.cartId, productId];
            await pg.query(deleteText, deleteValues);
            return res.status(204).send();
        }
        else if (cartQuantity > 0) {
            const updateText = `UPDATE cart
            SET cart_quantity = $3
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *`;
            const updateValues = [req.cartId, productId, cartQuantity];
            const { rows } = await pg.query(updateText, updateValues);
            if (rows.length) {
                const updatedCart = rows[0];
                return res.send(updatedCart);
            }
            //check to see if product exists
            const result = await pg.query('SELECT * FROM product WHERE product_id = $1', [productId]);
            if (!result.rows.length) return res.status(400).send('Bad Request');
            //add the new cart item
            const insertText = `INSERT INTO cart (cart_id, product_id, cart_quantity)
            VALUES ($1, $2, $3)
            RETURNING *`;
            const insertResult = await pg.query(insertText, updateValues);
            const addedToCart = insertResult.rows[0];
            res.send(addedToCart);
        }
    }
    catch(err) {
        return res.status(500).send('Internal Server Error');
    }
};

const checkout = async (req, res) => {
    const userId = req.userId;
    const { payMethod, cardNum, stripeId, amount } = req.body.paymentInfo;
    const { shipToName, shipToStreet, shipToCity, shipToState, shipToZip, email } = req.body.address;
    if (!userId) {
        return res.status(400).send('Please log in to complete this action.');
    }
    if (!shipToName || !shipToStreet || !shipToCity || !shipToState || !shipToZip || !email) {
        return res.status(400).send('Please fill out all shipping information.');
    }
    if (!cardNum) {
        return res.status(400).send('Please fill out all payment information.');
    }
    if (!validateCard(cardNum, payMethod)) {
        return res.status(400).send('Please enter valid payment information.');
    }
    //create Stripe payment
    if (stripeId && amount) {
        try {
            const payment = await stripe.paymentIntents.create({
                amount,
                currency: 'USD',
                description: 'Plus Ultra Store',
                payment_method: stripeId,
                confirm: true
            })
            console.log('Payment: ', payment);
        }
        catch(err) {
            console.log('Error: ', err);
            return res.status(400).send('Payment failed. Please try again.');
        }
    }
    //query items to proceed with checkout
    const findText = `SELECT cart_id, product_id, cart_quantity, sell_price, (cart_quantity * sell_price)::DECIMAL as item_total
    FROM cart
    JOIN product
    USING(product_id)
    WHERE cart_id = $1`;
    try {
        const { rows } = await pg.query(findText, [req.cartId]);
        if (!rows.length) return res.status(404).send('Cart not found.');
        const date = new Date(),
        items = rows,
        subtotal = rows.reduce((prev, curr) => prev + Number(curr.item_total), 0),
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
        const result = await pg.query(ordersText, ordersValues);
        const processedOrder = result.rows[0];
        orderId = processedOrder.order_id;
        const orderDetailsText = `INSERT INTO order_details (order_id, product_id, order_quantity, item_price)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
        let itemsAdded = 0;
        order.items.forEach(async item => {
            let orderDetailsValues = [orderId, item.product_id, item.cart_quantity, item.sell_price];
            await pg.query(orderDetailsText, orderDetailsValues);
            itemsAdded++;
            if (itemsAdded === order.items.length) {
                const orderDetText = `SELECT order_id, product_id, name, order_quantity, item_price, (order_quantity * item_price)::DECIMAL as item_total
                FROM order_details
                JOIN product
                USING(product_id)
                WHERE order_id = $1`;
                const orderDetValues = [orderId];
                const { rows } = await pg.query(orderDetText, orderDetValues);
                const orderDetails = rows;
                const clearCartText = 'DELETE FROM cart WHERE cart_id = $1';
                await pg.query(clearCartText, [req.cartId]);
                const completedOrder = {
                    processedOrder,
                    orderDetails
                };
                res.send(completedOrder);
            }
        });
    }
    catch (err) {
        return res.status(500).send('Internal Server Error');
    }
};

const getOrders = async (req, res) => {
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
    try {
        if (!sortOption) {
            const { rows } = await pg.query(noSortText, values);
            res.send(rows);
        }
        else if (sortOption === 'oldest') {
            const { rows } = await pg.query(sortOldText, values);
            res.send(rows);
        }
        else if (sortOption === 'newest') {
            const { rows } = await pg.query(sortNewText, values);
            res.send(rows);
        }
        else {
            res.status(400).send('Bad Request');
        }
    }
    catch(err) {
        return res.status(500).send('Internal Server Error');
    }
};

const setOrderId = (req, res, next, id) => {
    const orderId = id;
    const text = 'SELECT * FROM orders WHERE order_id = $1 AND user_id = $2';
    const values = [orderId, req.userId];
    pg.query(text, values, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (!result.rows.length) {
            return res.status(404).send('User not found.');
        }
        req.orderId = orderId;
        next();
    });
};

const getOrderById = async (req, res) => {
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
    const orderDetailsText = `SELECT order_id, product_id, name, url, order_quantity, item_price, (order_quantity * item_price)::DECIMAL as item_total
    FROM order_details
    JOIN product
    USING(product_id)
    WHERE order_id = $1`;
    const orderDetailsValues = [req.orderId];
    try {
        const { rows } = await pg.query(ordersText, ordersValues);
        if (!rows.length) return res.status(404).send('Order not found.');
        const summary = rows[0];
        const result = await pg.query(orderDetailsText, orderDetailsValues);
        const items = result.rows;
        const order = {
            summary,
            items
        };
        res.send(order);
    }
    catch(err) {
        return res.status(500).send('Internal Server Error');
    }
};

const deleteOrder = async (req, res) => {
    const orderDetailsText = 'DELETE FROM order_details WHERE order_id = $1';
    const orderDetailsValues = [req.orderId];
    const ordersText = 'DELETE FROM orders WHERE order_id = $1 AND user_id = $2';
    const ordersValues = [req.orderId, req.userId];
    try {
        await pg.query(orderDetailsText, orderDetailsValues);
        await pg.query(ordersText, ordersValues);
        res.status(204).send();
    }
    catch(err) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    logoutUser,
    getSession,
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