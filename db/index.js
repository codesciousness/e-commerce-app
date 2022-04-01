const { Pool } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASS, 
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT, 
  max: process.env.DB_MAX, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

const pool = new Pool(config);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
};