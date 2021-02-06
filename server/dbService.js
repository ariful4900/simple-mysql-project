const mysql = require('mysql');
require('dotenv').config();

let instance = null

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Database app_simple ' + connection.state);
})

class DbService {
    static getDbSerciveInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM namesAll;";

                connection.query(query, (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(res);
                })
            })
            // console.log(response);
            return response
        } catch (err) {
            console.log(err);
        }
    }
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO namesAll (name, date_added) VALUES (?, ?)";

                connection.query(query, [name, dateAdded], (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(res.insertId);
                })
            })

            return {
                id: insertId,
                name: name,
                date_added: dateAdded
            }
        } catch (err) {
            console.log(err);
        }
    }
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM namesAll WHERE id = ?";

                connection.query(query, [id], (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(res.affectedRows);
                })
            })
            return response === 1 ? true : false;
        } catch (e) {
            console.log(e);
            return false
        }
    }
    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE namesAll SET name = ? WHERE id = ?";

                connection.query(query, [name, id], (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(res.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (e) {
            console.log(e);
            return false
        }
    }

    async seachByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM namesAll WHERE name = ? ;";

                connection.query(query, [name], (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(res);
                })
            })
            // console.log(response);
            return response
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = DbService;