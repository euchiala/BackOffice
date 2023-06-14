const User = require('../models/User.model');

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving user' });
    } else {
      if (user) {
        // Compare the provided password with the stored hashed password
        User.comparePasswords(password, user.password, (err, isMatch) => {
          if (err) {
            res.status(500).send({ message: 'Error comparing passwords' });
          } else if (isMatch) {
            res.status(200).send({ message: 'Login successful' });
          } else {
            res.status(401).send({ message: 'Invalid credentials' });
          }
        });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    }
  });
};

exports.register = (req, res) => {
  const { username, password } = req.body;

  // Create a new User object
  const newUser = new User({
    username,
    password
  });

  User.register(newUser, (err, userId) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.status(201).send({ message: 'User registered successfully', userId });
    }
  });
};
