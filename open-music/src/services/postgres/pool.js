require('dotenv').config();
const { Pool } = require('pg');

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};
const pool = new Pool(config);
module.exports = pool;