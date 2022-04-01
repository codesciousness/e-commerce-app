const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
  
        if (err) return res.sendStatus(403).json({ error: "Not Authorized" });

        console.log(user);
    
        req.user = user;
  
        next();
    });
};

module.exports = {
    generateAccessToken,
    authenticateToken
};