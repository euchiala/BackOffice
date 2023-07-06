const FrontContent = require("../models/FrontContent.model");
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
    
    const frontContent = new FrontContent(req.body);
    if (req.file) {
      frontContent.file = req.file.path;
    }

    FrontContent.create(frontContent, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });
  
};


exports.update = (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
        const updatedFrontContent = new FrontContent(req.body);

        if (req.file) {
          updatedFrontContent.file = req.file.path;
        }
        FrontContent.updateByID(
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

exports.findAll = (req, res) => {
  FrontContent.getAll((err, data) => {
      res.status(err ? 500 : 201).send(err ? err : data);
  })
};
exports.findOne = (req, res) => {
  const {reference} = req.params;
  FrontContent.findByReference(reference, (err, data) => {
      if (err) {
          if (err.type === 'not_found') {
              res.status(404).send({message: `frontContent with reference ${reference} NOT FOUND`});
          } else {
              res.status(500).send({message: `Error getting frontContent with reference ${reference}`});
          }
      } else {
          res.status(200).send(data);
      }
  })
}

exports.findById = (req, res) => {
  const {id} = req.params;
  FrontContent.findById(id, (err, data) => {
      if (err) {
          if (err.type === 'not_found') {
              res.status(404).send({message: `frontContent with reference ${reference} NOT FOUND`});
          } else {
              res.status(500).send({message: `Error getting frontContent with reference ${reference}`});
          }
      } else {
          res.status(200).send(data);
      }
  })
}
exports.delete = (req, res) => {
  FrontContent.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res
          .status(404)
          .send({ message: `frontcontent with id ${req.params.id} NOT FOUND` });
      } else {
        res.status(500).send({
          message: `Error deleting frontcontent with id ${req.params.id}`,
          err,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
};
