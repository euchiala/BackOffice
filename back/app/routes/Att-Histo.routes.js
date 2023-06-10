module.exports = app => {
    const atthisto = require('../controllers/Att-Histo.controller');

    app.post('/atthisto', atthisto.create);

    app.get('/atthisto', atthisto.getAll);

    app.get('/atthisto/staff/:id', atthisto.findByStaff);

    app.put('/atthisto/:id', atthisto.update);

    app.delete('/atthisto/:id', atthisto.delete);
}