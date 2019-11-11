function prvaGodina(reference)
 {
  var x = document.getElementById('prva');
  var y= document.getElementById('predmeti');
   if(x.value=="+ Prva Godina")
    {
       x.value="- Prva Godina";       
       y.style.display="block";
       return false;
        
    }
   x.value="+ Prva Godina";  
   y.style.display="none";    
 }
        
 

 function drugaGodina(reference)
 {
  var y = document.getElementById('druga');
  var x= document.getElementById('predmetiDruga');
   if(y.value=="+ Druga Godina")
    {
       y.value="- Druga Godina";       
       x.style.display="block";
       return false;
        
    }
   y.value="+ Druga Godina";  
   x.style.display="none";    
 }

