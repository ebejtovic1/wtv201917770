var rows=10;
var cols=10;

document.write("<table>");
  for (i=0;i < rows; i++){
   document.write("<tr>");

  for (j=0; j < cols; j++) {

if(i==0 && j==0){document.write("<td id='sivo'>"+"x"+"</td");}
if(i==0 && j>0){document.write("<td id='sivo'>"+j+"</td");}
if(j==0 && i>0){document.write("<td id='sivo'>"+i+"</td");}
if(i%2==0){
document.write("<td id='zuto'>");
if(j>0 && i>0){ document.write(i*j);}
document.write("</td>");
}
else{

document.write("<td>");
if(j>0 && i>0){ document.write(i*j);}
document.write("</td>");
}
   }
   document.write("</tr>");
 }
document.write('</table>');
