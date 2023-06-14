const sql = require('./db');
const tableName = 'users';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = function (object) {
  this.username = object.username;
  this.password = object.password;
};

User.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE username = '${username}'`, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res[0]);
    }
  });
};

User.comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

User.register = (user, callback) => {
  bcrypt.hash(user.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return callback(err);
    }

    const newUser = new User({
      username: user.username,
      password: hashedPassword
    });

    sql.query(`INSERT INTO ${tableName} SET ?`, newUser, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res.insertId);
      }
    });
  });
};

module.exports = User;
