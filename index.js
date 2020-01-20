const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const sequelize = require('./db.js');
const express = require("express");
const app = express();
const Imenik = sequelize.import(__dirname+"/imenik.js");
const Adresar = sequelize.import(__dirname+"/adresar.js");
Imenik.sync().then( () => 
        Adresar.sync()
    )
app.use(bodyParser.json());
app.use(bodyParser({extended: true}))

app.post("/imenik",function(req,res){
    if(req.body['ime']&&req.body['prezime']&&req.body['adresa']&&req.body['broj_telefona']){
    Imenik.create({ime:req.body['ime'], 
    prezime:req.body['prezime'],
    adresa:req.body['adresa'], 
    brojTelefona:req.body['broj_telefona']}).then(function(zapis){res.send(zapis);}).catch(function(err){
    res.send(err);
               });
    }
});

app.get("/imenik",function(req,res){
    Imenik.findAll().then(function(rez){
        res.send(getTable(rez));
    });
});
app.listen(3000);


function getTable(results) {
    let str = "<table>"
    str += "<th>ime_i_prezime</th><th>adresa</th><th>broj_telefona</th>"
    for(let i = 0; i < results.length; i++){
        let obj = results[i]
        str += '<tr>'
        str += `<td>${obj.ime}</td><td>${obj.adresa}</td><td>${obj.brojTelefona}</td>`
        str += '</tr>'
    }
    str += "</table>"
    return str
}

app.post('/unos', function(req, res) {
    console.log(req.body)
    let obj = {
        ime: req.body['ime_i_prezime'],
        adresa: req.body['adresa'],
        brojTelefona: req.body['broj_telefona'],
        datumDodavanja: ''
    }
    Imenik.create(obj)
    res.end()
})

app.get('/poznanik/:kontakt', function(req, res) {
    let kontakt = req.params.kontakt

    Adresar.findAll({
        where: {
            idKontakta: kontakt
        }
    }).then(results => {
        let poznanici = []
        let br = 0
        for(let i = 0; i < results.length; i++) {
            Imenik.findOne({
                where: {
                    id: results[i].idPoznanika
                }
            }).then((r) => {
                poznanici.push(r);
                br++;
                if(br == results.length) {
                    res.end(getTable(poznanici))
                }
            })
        }
    })
})