const express = require('express');
require('dotenv').config();
// const bodyPerser = require('body-parser')

const app = express();

const cors = require('cors');

const dbServeice = require('./dbService')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/getAll', (req, res) => {
    const db = dbServeice.getDbSerciveInstance()
    const result = db.getAllData()
    result
        .then(data=>res.json({data: data}))
        .catch(err=>{
            console.log(err);
        })
});

const port = process.env.PORT;   

app.listen(port, ()=>{
    console.log(` Application is running on port ${port}`);
})