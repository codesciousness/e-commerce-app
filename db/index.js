const { Pool } = require('pg');
const pgSession = require('connect-pg-simple');
require('dotenv').config();

const devConfig = {
  user: process.env.DB_USER, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASS, 
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT, 
  max: process.env.DB_MAX, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

/* Alternate option: const devConfig = {
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: {
    rejectUnauthorized: false
  }
};*/

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

const config = devConfig; // Usual config setup: process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const pool = new Pool(config);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  sessionHandler: (session) => {
    const pgs = pgSession(session);
    return new pgs({pool});
  }
};