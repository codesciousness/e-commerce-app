const { Pool } = require('pg');
const config = {
  user: 'postgres', 
  database: 'e-commerce', 
  password: 'postgres', 
  host: 'localhost', 
  port: 5432, 
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};
const pool = new Pool(config);
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
};