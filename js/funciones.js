function ingresar(e){
    e.preventDefault();
    var usuario = document.getElementById('usuario').value;
    var clave = document.getElementById('clave').value;
    
    //Acá guardo la url para llamar a un Json con los datos que me ingresó el usuario
    var urlJsonRequerido = 'HTTP://168.194.207.98:8081/tp/login.php?user='+ usuario + '&pass=' + clave;
        
    //Esta variable hace una llamada a la función "RecibirJson" (ver la próxima función) pasandolé la url jsonRequerido
    var jsonResultante = JSON.parse(recibirJson(urlJsonRequerido));

        //Analizo la clave del nombre "respuesta" del Json (recordemos que en Json es nombre:clave), 
        //si me da error muestro el mensaje en pantalla...
        if(jsonResultante.respuesta == 'ERROR'){
            alert(jsonResultante.mje);

        //Si no, redirijo a la página correspondiente    
        }else{
            location.href = 'lista.html';
        }
}

//Esta función manda una dirección Json y recibe los datos y los devuelve
function recibirJson(url){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


function cargarDatos(){

    //Primero añadimos al div de arriba el cuadro de búsqueda
    var divBuscar = document.getElementById("seccionBuscar");
    var HTMLString = '<p><form id="busqueda" onsubmit="listaBusqueda(event)">' + 
    '<input type="text" id="buscar" name="buscar"><input type="submit" value="Buscar"></form><br><br>';
    divBuscar.innerHTML = HTMLString;

    //Obtenemos la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];
    //Creamos un elemento "table" y un elemento "tbody" (tody es el cuerpo de la tabla)
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    //Seteamos atributos a la tabla
    tabla.setAttribute("border", 2);
    tabla.setAttribute("id", "tabla");

    //Creamos la fila de los títulos
    var fila = document.createElement("tr");

    for (var i = 0; i < 5; i++) {
        // Crea un elemento <td> y un nodo de texto, hace que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var celda = document.createElement("td");
        if(i===0) var textoCelda = document.createTextNode("Id");
        if(i===1) var textoCelda = document.createTextNode("Usuario");
        if(i===2) var textoCelda = document.createTextNode("Bloqueado");
        if(i===3) var textoCelda = document.createTextNode("Apellido");
        if(i===4) var textoCelda = document.createTextNode("Nombre");
        

        //Agregamos a la celda correspondiente el texto
        celda.appendChild(textoCelda);
        //Ponemos en bold la celda
        celda.style.fontWeight="bold";
        //Agregamos la celda a la fila
        fila.appendChild(celda);
    }
    //Agregamos al body de la tabla (ojo, no es el body de la página) de la tabla la fila
    tblBody.appendChild(fila);
    //Agregarmos a la tabla el body de la tabla
    tabla.appendChild(tblBody)
    //Agregamos al body de la página principal la tabla
    body.appendChild(tabla);


    var jsonResultados = JSON.parse(recibirJson("http://168.194.207.98:8081/tp/lista.php?action=BUSCAR"));
        
    for(var i = 0; i < jsonResultados.length; i++){
        var fila = document.createElement("tr");
        var registros = Object.keys(jsonResultados[i]).length;
        for(var j = 0; j < registros; j++){
            var celda = document.createElement("td");

            var textoCelda = document.createTextNode(Object.values(jsonResultados[i])[j]);
            
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
        }
        if(Object.values(jsonResultados[i])[2] == 'Y'){
            fila.style.backgroundColor ='#cef8c6';
        }else{
            fila.style.backgroundColor ='#fd9f8b';
        }

        tblBody.appendChild(fila);

    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);    
    
}

function listaBusqueda(e){
    e.preventDefault();
    var busqueda = document.getElementById('buscar').value;

    //Primero limpiamos lo que haya en la lista de búsqueda
    document.getElementById("resultadoBusqueda").innerHTML="RESULTADO BÚSQUEDA:";
        
    //Creamos un elemento "table" y un elemento "tbody" (tody es el cuerpo de la tabla)
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    //Seteamos atributos a la tabla
    tabla.setAttribute("border", 2);
    tabla.setAttribute("id", "tabla");

    //Creamos la fila de los títulos
    var fila = document.createElement("tr");

    for (var i = 0; i < 7; i++) {
        // Crea un elemento <td> y un nodo de texto, hace que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var celda = document.createElement("td");
        if(i===0) var textoCelda = document.createTextNode("Id");
        if(i===1) var textoCelda = document.createTextNode("Usuario");
        if(i===2) var textoCelda = document.createTextNode("Bloqueado");
        if(i===3) var textoCelda = document.createTextNode("Apellido");
        if(i===4) var textoCelda = document.createTextNode("Nombre");
        if(i===5) var textoCelda = document.createTextNode("BLOQUEAR");
        if(i===6) var textoCelda = document.createTextNode("DESBLOQUEAR");
        

        //Agregamos a la celda correspondiente el texto
        celda.appendChild(textoCelda);
        //Ponemos en bold la celda
        celda.style.fontWeight="bold";
        //Agregamos la celda a la fila
        fila.appendChild(celda);
        //Agregamos al body de la tabla (ojo, no es el body de la página) de la tabla la fila
        tblBody.appendChild(fila);
    }
    
    //AHORA VAMOS A LA PARTE DE TRAER LOS REGISTROS DE LA BÚSQUEDA
    //Acá guardo la url para llamar a un Json con la búsqueda que ingresó el usuario
    var urlJsonRequerido = 'HTTP://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario='+ busqueda;
        
    //Esta variable hace una llamada a la función "RecibirJson" (ver la próxima función) pasandolé la url jsonRequerido
    var jsonResultante = JSON.parse(recibirJson(urlJsonRequerido));

    //Div resultado búsqueda en la página principal
    var divResultadoBusqueda = document.getElementById("resultadoBusqueda");

    if(Object.keys(jsonResultante).length === 0){
        alert("Su búsqueda no ha arrojado resultados");
    }
    

    for (var i=0;i<jsonResultante.length;i++){
        var fila = document.createElement("tr");
        var cantidad = Object.keys(jsonResultante[i]).length;
        
        for(var j=0; j<cantidad+2;j++){
            var celda = document.createElement("td");
            if(j<cantidad){
                var textoCelda = document.createTextNode(Object.values(jsonResultante[i])[j]);
            }

            else if (j == cantidad){
                var textoCelda = document.createElement("button");
                textoCelda.onclick = cambiarEstado(Object.values(jsonResultante[i])[0], 'Y');
                textoCelda.innerHTML = "Bloquear";
            }else if(j == cantidad + 1){
                var textoCelda = document.createElement("button");
                textoCelda.onclick = cambiarEstado(Object.values(jsonResultante[i])[0], 'N');
                textoCelda.innerHTML = "Desbloquear";
            }
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
        }
        if(Object.values(jsonResultante[i])[2] == 'Y'){
            fila.style.backgroundColor ='#cef8c6';
        }else{
            fila.style.backgroundColor ='#fd9f8b';
        }
        tblBody.appendChild(fila);
    }
    

    //Agregarmos a la tabla el body de la tabla
    tabla.appendChild(tblBody)
    //Agregamos al div donde irá la tabla de búsqueda en la página principal la tabla
    divResultadoBusqueda.appendChild(tabla);


        
}

function cambiarEstado(userId, bloqueado, listener){
    fetch('http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser='+userId+'&estado='+bloqueado)
        .then(res => {listener()}).catch(err =>{})

    
}



