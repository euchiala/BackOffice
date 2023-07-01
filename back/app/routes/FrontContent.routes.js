module.exports = (app) => {
  const frontContent = require("../controllers/FrontContent.controller");

  app.post("/frontcontent", frontContent.create);

  app.get('/:reference', frontContent.findOne);

  app.put("/frontcontent/:id", frontContent.update);

  app.delete("/frontcontent/:id", frontContent.delete);
};
