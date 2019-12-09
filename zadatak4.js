const http = require('http');
const fs = require('fs');
const url = require('url');
http.createServer(function(req,res){
   if(req.method=='POST'){
       let tijeloZahtjeva = '';
       req.on('data',function(data){
           tijeloZahtjeva+=data;
       });
       req.on('end',function(){
           //primljen čitav zahtjev
           let parametri = new url.URLSearchParams(tijeloZahtjeva);
           let novaLinija = parametri.get('ime')+","+parametri.get('prezime')+","+parametri.get('adresa')+","+parametri.get('broj_telefona');
           fs.appendFile('imenik.txt',novaLinija,function(err){
               if(err) throw err;
               console.log("Novi red uspješno dodan!");
               res.writeHead(200,{});
               res.end(parametri.toString());
           });
       });
   }
    if(req.method=='POST'&& req.url=="/json"){
            let tijeloZahtjeva = '';
            req.on('data',function(data){
                tijeloZahtjeva+=data;
            });
            req.on('end',function(){
                var par=JSON.parse(tijeloZahtjeva);
                let novaLinija = par.ime+","+par.prezime+ ","+par.adresa+","+par.broj_telefona+"\n";
                fs.appendFile('imenik.txt',novaLinija,function(err){
                    if(err) throw err;
                    console.log("Novi red uspješno dodan!");
                    res.writeHead(200,{});
                    fs.readFile('imenik.txt',function(err,content){
                        if(err) throw err;
                         res.end(content.toString());
                    })
                });
            });
        }
}).listen(8080);