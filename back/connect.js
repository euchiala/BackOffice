var mysql = require('mysql');

var cnx  = mysql.createPool({
    host            : 'localhost',
    port            : '3306',
    user            : 'root',
    password        : '',
    database        : 'intekk_consulting'
  });
module.exports = cnx;