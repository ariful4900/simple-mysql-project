const express = require('express');
require('dotenv').config();
// const bodyPerser = require('body-parser')

const app = express();

const cors = require('cors');

const dbServeice = require('./dbService');
// const { json } = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//create Post
app.post('/insert', (req, res) => {
    const { name } = req.body;
    const db = dbServeice.getDbSerciveInstance();
    const result = db.insertNewName(name);

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err))
})



//get all post
app.get('/getAll', (req, res) => {
    const db = dbServeice.getDbSerciveInstance();
    const result = db.getAllData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => {
            console.log(err);
        })
});

//update
app.patch('/update', (req, res) => {
    const { id, name } = req.body; 
    const db = dbServeice.getDbSerciveInstance();

    const result = db.updateNameById(id, name);
    result
        .then(data => res.json({ success: data }))
        .catch(err => {
            console.log(err);
        })
    console.log(result);
}); 

//delete
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;  
    const db = dbServeice.getDbSerciveInstance();
 
    const result = db.deleteRowById(id)
    result
        .then(data => res.json({ success: data }))
        .catch(err => {
            console.log(err);
        })
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(` Application is running on port ${port}`);
})