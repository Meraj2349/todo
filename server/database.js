const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAMES,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DBPORT,
});

if (pool) {
  console.log("Connected to the database");
}

module.exports = pool;