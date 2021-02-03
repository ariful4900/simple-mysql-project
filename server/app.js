const express = require('express');
require('dotenv').config();
// const bodyPerser = require('body-parser')

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/getAll', (req, res) => {
    res.json({
        success: true
    })
});

const port = process.env.PORT; 

app.listen(port, ()=>{
    console.log(` Application is running on port ${port}`);
})