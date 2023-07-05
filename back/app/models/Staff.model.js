const sql = require('./db');
const tableName = 'staff';
const staff = function (object) {
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.email = object.email;
    this.phone = object.phone;
    this.adress = object.adress;
    this.links = object.links;
    this.cin = object.cin;
    this.color = object.color;
    this.file = object.file;
}

staff.create = (newObject, result) => {
    sql.query(`INSERT INTO ${tableName} SET ?`, newObject, (err, res) => {
        if (err)
            result(err, null);
        else
            result(null, { id: res.insertId, ...newObject });
    });
};

staff.findByID = (id, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE id = '${id}'`, (err, res) => {
        if (err)
            result(err, null);
        else
            result(null, res[0]);
    });
};

staff.getAll = result => {
    sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
};

staff.update = (id, object, result) => {
    sql.query(
        `
            UPDATE ${tableName} SET 
            firstName = ?,
            lastName = ?,
            email = ?,
            phone = ?,
            adress = ?,
            links = ?,
            cin = ?,
            color = ?,
            file = ?,
            WHERE id = '${id}'
        `,
        [object.firstName, object.lastName, object.email, object.phone, object.adress, object.links,object.cin, object.color, object.file],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                result({ type: 'not_found' }, null);
                return;
            }
            result(null, { id: id, ...object })
        }
    )
};


staff.delete = (id, result) => {
    sql.query(`DELETE FROM ${tableName} WHERE id = ?`, id, (err, res) => {
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


module.exports = staff;