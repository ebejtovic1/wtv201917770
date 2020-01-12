const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('files'));

app.get("/index.html", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.get("/style.css", function(req, res){
    res.sendFile(__dirname + "/style.css");
});
app.get("/slika1.jpeg", function(req, res){
    res.sendFile(__dirname + "/slika1.jpeg");
});
app.get("/stranica1.html", function(req, res){
    res.sendFile(__dirname + "/stranica1.html");
});
app.get("/stranica2.html", function(req, res){
    res.sendFile(__dirname + "/stranica2.html");
});
app.get("/stranica3.html", function(req, res){
    res.sendFile(__dirname + "/stranica3.html");
});
app.listen(8085);