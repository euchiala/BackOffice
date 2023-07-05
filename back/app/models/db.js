const mysql = require("mysql");
const dbConfig = require('../config/db.config');

let connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    timezone: dbConfig.timezone
});

module.exports = connection;