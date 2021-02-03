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
                const query = "SELECT * FROM names;";

                connection.query(query, (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(res);
                })
            })
            console.log(response);
            return response
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = DbService;