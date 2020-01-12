const express = require('express');
const http = require('http')
const fs = require('fs');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
const pool= mysql.createPool({
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'imenik',
    port: 3308
});

app.get("/imenik", function(req, res){
    pool.getConnection(function(err, connection) {
        if(err)throw err;
        connection.query( 'SELECT* from imenik', function(err, rows) {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write("<HTML>");
            res.write("<table>");

                for(var i=0;i<rows.length;i++) {
                    var objekat = {ime:rows[i].Ime_i_prezime,  adresa:rows[i].Adresa, broj_telefona:rows[i].Broj_telefona};
                    res.write("<tr>");
                    res.write("<td>"+objekat.ime+"</td>"+"<td>"+objekat.adresa+"</td>"+"<td>"+objekat.broj_telefona+"</td>");
                    res.write("</tr>");
                }
            res.write("</table>");
            res.end("</HTML>");
      
        });
      });
    
});

app.post("/forma.html", function(req, res) {
    let obj = {
        ime_i_prezime: req.body['ime_i_prezime'],
        adresa: req.body['adresa'],
        broj_telefona: req.body['broj_telefona']
    }
    pool.getConnection(function(err, connection) {
        if(err)throw err;
        connection.query('INSERT INTO imenik SET ?', obj, function(error) {
        res.redirect('http://localhost:3000/imenik')
        if(error)
            throw error;
        });
    });
});

app.get('/poznanik/:kontakt', function(req, res) {
    let kontakt = req.params.kontakt;
    pool.getConnection(function(err, connection) {
        if(err)throw err;
        connection.query('SELECT * FROM imenik WHERE EXISTS (SELECT * FROM adresar WHERE idKontakta='+kontakt+' && idPoznanik=ID)', function(err, rows) {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write("<HTML>");
            res.write("<table>");

                for(var i=0;i<rows.length;i++) {
                    var objekat = {ime:rows[i].Ime_i_prezime,  adresa:rows[i].Adresa, broj_telefona:rows[i].Broj_telefona};
                    res.write("<tr>");
                    res.write("<td>"+objekat.ime+"</td>"+"<td>"+objekat.adresa+"</td>"+"<td>"+objekat.broj_telefona+"</td>");
                    res.write("</tr>");
                }
            res.write("</table>");
            res.end("</HTML>");
        });
      });
});

app.listen(3000);