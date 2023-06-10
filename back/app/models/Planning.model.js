const sql = require('./db');
const tableName = 'planning';
const planning = function (object) {
    this.staffId = object.staffId;
    this.title = object.title;
    this.start = object.start;
    this.color = object.color;
}

planning.create = (newObject, result) => {
    sql.query(`INSERT INTO ${tableName} SET ?`, newObject, (err, res) => {
        if(err)
            result(err, null);
        else
            result(null, {id: res.insertId, ...newObject});
    });
};

planning.findByID = (id, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE staffId = '${id}'`, (err, res) => {
        if(err)
            result(err, null);
        else
            result(null, res);
    });
};

planning.getAll = result => {
    sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if(err)
            result(err, null);
        else
            result(null, res);
    });
};

planning.update = (id, object, result) => {
    sql.query(
        `
            UPDATE ${tableName} SET 
            staffId = ?,
            title = ?,
            start = ?
            color = ?
            WHERE staffId = '${id}'
        `,
        [object.staffId ,object.title, object.start, object.color],
        (err, res) => {
            if(err)
            {
                result(err, null);
                return;
            }
            if(res.affectedRows === 0)
            {
                result({type: 'not_found'}, null);
                return;
            }
            result(null, {id: id, ...object})
        }
    )
};


planning.delete = (id, result) => {
    sql.query(`DELETE FROM ${tableName} WHERE id = ?`, id,  (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({ type: "not_found" }, null);
            return;
        }

        result(null, res);
    })
}


module.exports = planning;