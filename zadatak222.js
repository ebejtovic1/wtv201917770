var fs = require('fs');
var http=require('http');
const url = require('url');
http.createServer(function (req, res) {
if(req.method=="GET"){

  res.writeHead(200, {'Content-Type': 'application/json'});
	 var p= new url.parse(req.url,true);
	 var q=p.query;
   q=new url.URLSearchParams(q);
   console.log(q);
    fs.readFile("imenik.txt", function(err,data){
      if(err)throw err;
    	var n=[];
       var tekst=data.toString();
       var redovi=tekst.split("\n");

           for(var i=0;i<redovi.length;i++){
                    
                    var kolone=redovi[i].split(",");
                    //da budu sva mala slova
                    if(kolone.length>1 && kolone[0].toLowerCase() == q.get('q').toLowerCase()){//tražimo q indexof pretrazuje string kolone[0] u ovom slucaju tj. kolona[0] je ime
                    var objekat={ime: kolone[0], prezime: kolone[1],adresa: kolone[2],broj: kolone[3]};//kreiramo objekat samo ako pronađemo to q u nekom od imena
                    n.push(objekat);
                }

                 }
                  res.end(JSON.stringify(n));
    
            
        });



   }

  
        }).listen(8080);