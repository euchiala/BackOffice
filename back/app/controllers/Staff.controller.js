const staff = require('../models/Staff.model');
const multer = require("multer");

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// File filter function to allow only certain file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."), false);
    }
};

// Set up multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    "file"
);

exports.create = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        const object = new staff(req.body);
        if (req.file) {
            object.file = req.file.path;
        }

        staff.create(object, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
        });
    });
};


exports.getAll = (req, res) => {
    staff.getAll((err, data) => {
        res.status(err ? 500 : 201).send(err ? err : data);
    })
};

exports.findOne = (req, res) => {
    const { id } = req.params;
    staff.findByID(id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({ message: `staff with id ${id} NOT FOUND` });
            } else {
                res.status(500).send({ message: `Error getting staff with id ${id}` });
            }
        } else {
            res.status(200).send(data);
        }
    })
}
exports.update = (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
        const updatedFrontContent = new staff(req.body);

        if (req.file) {
          updatedFrontContent.file = req.file.path;
        }
        staff.update(
          req.params.id,
          updatedFrontContent,
          (err, data) => {
            if (err) {
              if (err.type === "not_found") {
                res
                  .status(404)
                  .send({
                    message: `frontcontent with id ${req.params.id} NOT FOUND`,
                  });
              } else {
                res
                  .status(500)
                  .send({
                    message: `Error updating frontcontent with id ${req.params.id}`,
                    err,
                  });
              }
            } else {
              res.status(200).send(data);
            }
          }
        );
    });
};

exports.delete = (req, res) => {
    staff.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.type === 'not_found') {
                res.status(404).send({ message: `staff with id ${id} NOT FOUND` });
            } else {
                res.status(500).send({ message: `Error deleting staff with id ${id}` });
            }
        } else {
            res.status(200).send(data);
        }
    })
};