var rows = 10;
var cols = 10;

document.write("<table>")

for(var i = 0; i <= rows; i++){
    document.write("<tr>");
    var parni = i;

    for(var j = 0; j <= cols; j++){

        if(i==0 && j==0) document.write("<th> X </th>");

        else if(i == 0 && j != 0) document.write("<th>" + j + "</th>");

        else if(i == 1 && j != 0) document.write("<td>" + j + "</td>");
        
        else if(j == 0) document.write("<th>" + i + "</th>");
        
        else if(i%2 == 0 && i != 0) {

            if(j == 0) document.write("<td id = 'zuto'>" + i + "</td>");
            else document.write("<td id = 'zuto' >" + parni + "</td>");

            parni += i;
        }

        else if(i%2 != 0 && i != 1) {
            
            if(j == 0) document.write("<td>" + i + "</td>");
            else document.write("<td>" + parni + "</td>");

            parni += i;
        }
    }
    document.write("</tr>");
}

document.write("</table>")