const sql = require('./db');
const tableName = 'frontcontent';
const FrontContent = function (object) {
  this.id = object.id;
  this.header = object.header;
  this.subheader = object.subheader;
  this.text = object.text;
  this.links = object.links;
  this.reference = object.reference;
  this.checkbox = object.checkbox;
  this.file = object.file;
};

FrontContent.create = (newObject, result) => {
  sql.query('INSERT INTO frontcontent SET ?', newObject, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { id: res.insertId, ...newObject });
    }
  });
};

FrontContent.getAll = (result) => {
  sql.query('SELECT * FROM frontcontent', (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

FrontContent.findByReference = (reference, result) => {
  sql.query(`SELECT * FROM frontcontent WHERE reference = '${reference}'`, (err, res) => {
      if(err)
          result(err, null);
      else
          result(null, res);
  });
};

FrontContent.findById = (id, result) => {
  sql.query(`SELECT * FROM frontcontent WHERE id = '${id}'`, (err, res) => {
      if(err)
          result(err, null);
      else
          result(null, res);
  });
};

FrontContent.getAll = result => {
  sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
      if(err)
          result(err, null);
      else
          result(null, res);
  });
};

FrontContent.updateByID = (id, object, result) => {
  sql.query(
    'UPDATE frontcontent SET header = ?, subheader = ?, text = ?, links = ?, reference = ?, file = ?,checkbox = ? WHERE id = ?',
    [object.header, object.subheader, object.text, object.links, object.reference, object.file, object.checkbox, id],
    (err, res) => {
      if (err) {
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ type: 'not_found' }, null);
      } else {
        result(null, { id: id, ...object });
      }
    }
  );
};

FrontContent.delete = (id, result) => {
  sql.query('DELETE FROM frontcontent WHERE id = ?', id, (err, res) => {
    if (err) {
      result(err, null);
    } else if (res.affectedRows === 0) {
      result({ type: 'not_found' }, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = FrontContent;
