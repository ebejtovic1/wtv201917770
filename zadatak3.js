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
           let novaLinija = parametri.get('ime')+","+parametri.get('prezime')+ ","+parametri.get('adresa')+","+parametri.get('broj_telefona')+"\n";
           fs.appendFile('imenik.txt',novaLinija,function(err){
               if(err) throw err;
               console.log("Novi red uspješno dodan!");
             
               
 
               fs.readFile('imenik.txt', function(err,content){
                console.log('hi');
                   if(err) throw err;
                   res.writeHead(200,{'Content-type':'text/html'});
                   var p=content.toString();
                   var redovi=p.split("\n");
                   res.write('<table><tr><td>Ime</td>'+'<td>Prezime</td>"+"<td>Adresa</td>'+'<td>Broj telefona</td></tr>');
                    for(var i=0;i<redovi.length;i++)
                   { 
                     var kolone = redovi[i].split(',');
                    res.write('<tr>');
                    res.write('<td>'+kolone[0]+'</td>');
                    res.write('<td>'+kolone[1]+'</td>');
                    res.write('<td>'+kolone[2]+'</td>');
                    res.write('<td>'+kolone[3]+'</td></tr>');
    }
    
                   res.write('</table>');
                   res.end();
               })
 
          
       });
   });
     }
 
 
}).listen(8080);