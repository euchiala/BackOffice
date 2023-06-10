const atthisto = require('../models/Att-Histo.model');

exports.create = (req, res) => {
    const object = new atthisto(req.body);

    atthisto.create(object, (err, data) => {
        res.status(err ? 500 : 201).send(err ? err : data);
    })
};

exports.getAll = (req, res) => {
    atthisto.getAll((err, data) => {
        res.status(err ? 500 : 201).send(err ? err : data);
    })
};

exports.findByStaff = (req, res) => {
    const {id} = req.params;
    atthisto.findByStaffId(id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({message: `atthisto with Staffid ${id} NOT FOUND`});
            } else {
                res.status(500).send({message: `Error getting atthisto with Staffid ${id}`});
            }
        } else {
            res.status(200).send(data);
        }
    })
}

exports.update = (req, res) => {
    atthisto.updateByID(
        req.params.id,
        new atthisto(req.body),
        (err, data) => {
            if (err) {
                if (err.type === 'not_found') {
                    res.status(404).send({message: `atthisto with id ${req.params.id} NOT FOUND`});
                } else {
                    res.status(500).send({message: `Error updating atthisto with id ${req.params.id}`, err});
                }
            } else {
                res.status(200).send(data);
            }
        }
    )
};

exports.delete = (req, res) => {
    atthisto.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({message: `atthisto with id ${id} NOT FOUND`});
            } else {
                res.status(500).send({message: `Error deleting atthisto with id ${id}`});
            }
        } else {
            res.status(200).send(data);
        }
    })
};