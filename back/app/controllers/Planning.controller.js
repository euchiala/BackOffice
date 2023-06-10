const planning = require('../models/Planning.model');

exports.create = (req, res) => {
    const object = new planning(req.body);

    planning.create(object, (err, data) => {
        res.status(err ? 500 : 201).send(err ? err : data);
    })
};

exports.getAll = (req, res) => {
    planning.getAll((err, data) => {
        res.status(err ? 500 : 201).send(err ? err : data);
    })
};

exports.findOne = (req, res) => {
    const {id} = req.params;
    planning.findByID(id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({message: `planning with id ${id} NOT FOUND`});
            } else {
                res.status(500).send({message: `Error getting planning with id ${id}`});
            }
        } else {
            res.status(200).send(data);
        }
    })
}

exports.update = (req, res) => {
    planning.update(
        req.params.id,
        new planning(req.body),
        (err, data) => {
            if (err) {
                if (err.type === 'not_found') {
                    res.status(404).send({message: `planning with id ${req.params.id} NOT FOUND`});
                } else {
                    res.status(500).send({message: `Error updating planning with id ${req.params.id}`, err});
                }
            } else {
                res.status(200).send(data);
            }
        }
    )
};

exports.delete = (req, res) => {
    planning.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({message: `planning with id ${id} NOT FOUND`});
            } else {
                res.status(500).send({message: `Error deleting planning with id ${id}`});
            }
        } else {
            res.status(200).send(data);
        }
    })
};