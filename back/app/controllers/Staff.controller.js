const staff = require('../models/Staff.model');

exports.create = (req, res) => {
    const object = new staff(req.body);

    staff.create(object, (err, data) => {
        res.status(err ? 500 : 201).send(err ? err : data);
    })
};

exports.getAll = (req, res) => {
    staff.getAll((err, data) => {
        res.status(err ? 500 : 201).send(err ? err : data);
    })
};

exports.findOne = (req, res) => {
    const {id} = req.params;
    staff.findByID(id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({message: `staff with id ${id} NOT FOUND`});
            } else {
                res.status(500).send({message: `Error getting staff with id ${id}`});
            }
        } else {
            res.status(200).send(data);
        }
    })
}

exports.update = (req, res) => {
    staff.update(
        req.params.id,
        new staff(req.body),
        (err, data) => {
            if (err) {
                if (err.type === 'not_found') {
                    res.status(404).send({message: `staff with id ${req.params.id} NOT FOUND`});
                } else {
                    res.status(500).send({message: `Error updating staff with id ${req.params.id}`, err});
                }
            } else {
                res.status(200).send(data);
            }
        }
    )
};

exports.delete = (req, res) => {
    staff.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({message: `staff with id ${id} NOT FOUND`});
            } else {
                res.status(500).send({message: `Error deleting staff with id ${id}`});
            }
        } else {
            res.status(200).send(data);
        }
    })
};