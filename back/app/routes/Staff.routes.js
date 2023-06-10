module.exports = app => {
    const staff = require('../controllers/Staff.controller');

    app.post('/staff', staff.create);

    app.get('/staff', staff.getAll);

    app.get('/staff/:id', staff.findOne);

    app.put('/staff/:id', staff.update);

    app.delete('/staff/:id', staff.delete);
}