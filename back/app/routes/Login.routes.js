module.exports = (app) => {
    const login = require('../controllers/Login.controller');

    app.post('/register', login.register);
    app.post('/login', login.login);
  };
  