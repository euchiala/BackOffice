module.exports = app => {
    const planning = require('../controllers/Planning.controller');

    app.post('/plannings', planning.create);

    app.get('/plannings', planning.getAll);

    app.get('/plannings/:id', planning.findOne);

    app.put('/plannings/:id', planning.update);

    app.delete('/plannings/:id', planning.delete);
}