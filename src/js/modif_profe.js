const palabrAdivinar = ingresarPalabra();
let arrCoincidencias = [];
let arrUsadas = [];
let errados = 0;
let vidas = 6;
let aciertos = 0;

const letra = document.querySelector('input');  
letra.oninput = function(){  //oninput cada vez que el ususario escriba en el input
    soloLetras(letra.value.toUpperCase(), aciertos, palabrAdivinar); //convierto las letras a mayuscula tmb
};

function ingresarPalabra(){
    const palabra = prompt("Ingresa una palabra para adivinar!");
    const uppercase = palabra.toUpperCase();
    if(!/^[a-zA-Z]+$/.test(uppercase)) {
        alert("Palabra no permitida.");
        window.location.reload();
    } else {
        const arrPalabra = uppercase.split("");
    document.getElementById("tablero").innerHTML = `
        <table border="1">
            <tr>
                ${creaTablero(arrPalabra)}    
            </tr>    
        </table>
    `;


    
    return arrPalabra;
    }
};


function creaTablero(arrPalabra){
    let tablero = "";
    arrPalabra.forEach(letra => {
        tablero += "<td> ? </td>";
    });
    return tablero;
};

function soloLetras(cadena,arrCoincidencias, aciertos, palabrAdivinar){
    const pattern = new RegExp('[a-zA-Z]'); //RegExp se utiliza para hacer coincidir texto con un patrón
    console.log(pattern.test(cadena)); //aber si coincide con el patron
    if(!pattern.test(cadena)){
        document.querySelector('input').value = ""; //vuelve a nada el valor del input
        document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!";
        return false;
    }else{
        document.getElementById("tablero").innerHTML = `
        <table border="1">
            <tr>
                ${buscarCoincidencia(cadena,arrCoincidencias, aciertos, palabrAdivinar)}    
            </tr>    
        </table>
    `;

        document.getElementById("ahorcado").innerHTML = `
            <img src="img/${errados}.png">
        `;


        return true;
    }
};

function buscarCoincidencia(letra, aciertos, palabrAdivinar){
    let tablero = "";
    let coincidencias = 0;
    
    palabrAdivinar.forEach(caracter => {            
        //console.log(caracter + letra);
        if (arrCoincidencias.includes(caracter)){
            tablero = tablero + "<td style='background-color: #C5D8A4'>"+ caracter +" </td>"; //letra que ya está
        }
        if(caracter == letra){
            tablero = tablero + "<td style='background-color: #C5D8A4'>"+ caracter +" </td>"; //imprime la tabla con la letra que si
            coincidencias++; 
            aciertos++;
            arrCoincidencias.push(caracter);
        
        }else{
            tablero = tablero + "<td> ? </td>";
        }
        leyendaCoincidencia(coincidencias);
    });

    if(coincidencias==0){
        errados++;
        vidas-=1;
    }

    arrUsadas.push(letra);
    console.log(arrUsadas);
    victoria(aciertos, palabrAdivinar);
    
    return tablero;
    
};


function leyendaCoincidencia(coincidencias){
    if(coincidencias > 0){
        document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
    }else {
        document.getElementById("status").innerHTML = `No hubo coinciencias :( Quedan ${vidas} vidas.`;
    }
};

function victoria(aciertos, palabrAdivinar){

    if(vidas==0){
        document.getElementById("palabras").innerHTML = `
        <h3> Perdiste :( </h3>
        `;
    }
    console.log(palabrAdivinar.length);
    console.log(aciertos);
    if(aciertos == palabrAdivinar.length){
        document.getElementById("palabras").innerHTML = `
        <h3> GANASTE :D </h3>
        `;
    }
}

