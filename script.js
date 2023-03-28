const palabrAdivinar = ingresarPalabra();
let arrCoincidencias = [];

const letra = document.querySelector('input');  
letra.oninput = function(){  //oninput cada vez que el ususario escriba en el input
    soloLetras(letra.value, palabrAdivinar);
};

function ingresarPalabra(){
    const palabra = prompt("Ingresa una palabra para adivinar!");
    const arrPalabra = palabra.split("");
    console.log(arrPalabra);
    document.getElementById("tablero").innerHTML = `
        <table border="1">
            <tr>
                ${creaTablero(arrPalabra)}    
            </tr>    
        </table>
    `;
    return arrPalabra;
};

function creaTablero(arrPalabra){
    let tablero = "";
    arrPalabra.forEach(letra => {
        tablero = tablero + "<td> ? </td>";
    });
    return tablero;
};

function soloLetras(cadena, palabrAdivinar){
    const pattern = new RegExp('[a-zA-Z]'); //RegExp se utiliza para hacer coincidir texto con un patrón
    console.log(pattern.test(cadena));
    if(!pattern.test(cadena)){
        document.querySelector('input').value = ""; //vuelve a nada el valor del input
        document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!..";
        return false;
    }else{
        document.getElementById("tablero").innerHTML = `
        <table border="1">
            <tr>
                ${buscarCoincidencia(cadena,palabrAdivinar)}    
            </tr>    
        </table>
    `;
        return true;
    }
};

function buscarCoincidencia(letra, arrPalabra){
    let tablero = "";
    let coincidencias = 0;
    arrPalabra.forEach(caracter => {
        if(caracter == letra){
            tablero = tablero + "<td>"+ caracter +" </td>"; //imprime la tabla con la letra que si 
            coincidencias = coincidencias + 1;
        }else{
            tablero = tablero + "<td> ? </td>";
        }
        leyendaCoincidencia(coincidencias);
    });
    return tablero;
};

function leyendaCoincidencia(coincidencias){
    if(coincidencias > 0){
        document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
    }else{
        document.getElementById("status").innerHTML = `No hubo coinciencias :(`;
    }
};