var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
if(req.method=="GET"){
      fs.readFile("imenik.txt",function(err,data){
      var n=[];
      var tekst=data.toString();
      var redovi=tekst.split("\r\n");
      for(var i=0;i<redovi.length-1;i++){
      var kolone=redovi[i].split(",");
      var objekat={ime:kolone[0],prezime:kolone[1],adresa:kolone[2],brojtelefona:kolone[3]};
      n.push(objekat);}
      res.writeHead(200,{'Content-Type':"application/json"});
      res.end(JSON.stringify(n));});}
      }).listen(8080);

