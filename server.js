const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var currentBoard;

app.post('/updateBoard', (req, res, next) => {
    if (req.body) {
        currentBoard = req.body;
        res.end();
    }
});

app.get('/getBoard', (req,res, next) => {
    res.send(currentBoard);
});

app.listen(port, () => {
    console.log("Listening on port: ", port);
})