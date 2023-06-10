const sql = require('./db');
const tableName = 'atthisto';
const atthisto = function (object) {
    this.staffId = object.staffId;
    this.attTime = object.attTime;
}

atthisto.create = (newObject, result) => {
    sql.query(`INSERT INTO ${tableName} SET ?`, newObject, (err, res) => {
        if(err)
            result(err, null);
        else
            result(null, {id: res.insertId, ...newObject});
    });
};

atthisto.findByStaffId = (id, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE staffId = '${id}'`, (err, res) => {
        if(err)
            result(err, null);
        else
            result(null, res[0]);
    });
};

atthisto.getAll = result => {
    sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if(err)
            result(err, null);
        else
            result(null, res);
    });
};

atthisto.update = (id, object, result) => {
    sql.query(
        `
            UPDATE ${tableName} SET 
            staffId  = ?,
            attTime= ?
            WHERE id = '${id}'
        `,
        [object.staffId , object.attTime],
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


atthisto.delete = (id, result) => {
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


module.exports = atthisto;