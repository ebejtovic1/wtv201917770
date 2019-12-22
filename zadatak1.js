const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/unos', function(req, res){
    res.sendFile(__dirname + "/forma.html");
});
app.post('/', function(req, res){
    let tijelo = req.body;
    let novaLinija = "\n"+tijelo['ime']+","+tijelo['prezime']+","+tijelo['adresa']+","+tijelo['broj_telefona'];
    fs.appendFile('imenik.txt', novaLinija, function(err){
        if (err) throw err;
        fs.readFile('imenik.txt', (error, data) => {
            let podaci = data.toString('utf-8');
            let nizLinija = podaci.split('\n');
            let table = '<table>';
            table += '<tr><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Broj telefona</th></tr>';
            for (let i = 0; i < nizLinija.length; i++){
                table += '<tr>';
                let args = nizLinija[i].split(',');
                for (let j = 0; j < 4; j++){
                    table += '<td>' + args[j] + '</td>';
                }
                table += '</tr>'
            }
            table += '</table>';
            res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
            res.write(table);
            res.end();
        });
    })
});
app.listen(8085);