const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let parentesis = false
let signoOperacion = false
let primerNumero = '';
let operador = '';
let segundoNumero = '';
let escribiendoSegundoNumero = false;

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const onClickBtn = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";
            primerNumero = '';
            operador = '';
            segundoNumero = '';
            escribiendoSegundoNumero = false;
            return;
        }        

        if (boton.id === "igual") {
            if (primerNumero !== '' && operador !== '' && segundoNumero !== '') {
                try {
                    let resultado = eval(`${primerNumero} ${operador} ${segundoNumero}`);
                    let resultadoRedondeado = parseFloat(resultado.toFixed(6));
                    pantalla.textContent = resultadoRedondeado;
                    primerNumero = resultadoRedondeado.toString();
                    operador = '';
                    segundoNumero = '';
                    escribiendoSegundoNumero = false;
                } catch {
                    pantalla.textContent = "error";
                }
            }
            return;
        }

        if (boton.id === "signo") {

            if (signoOperacion === false) {
                pantalla.textContent = - + pantalla.textContent
                signoOperacion = false
            }
            else if (signoOperacion === true) {
                pantalla.textContent = + + pantalla.textContent
                signoOperacion = true

            } 
            return
        }
        
        if (boton.id === "porcentaje") {
            pantalla.textContent = pantalla.textContent / 100;
            return;
        }

        // if (boton.id === "parentesis"){
        //     if (parentesis === false){
        //         pantalla.textContent += "("
        //         parentesis = true
        //     } 
        //     else if (parentesis === true){
        //         pantalla.textContent += ")"
        //         parentesis = false
        //     }
        //     return
        // }

        if (boton.classList.contains("operador")) {
            if (pantalla.textContent !== "0" && pantalla.textContent !== "error" && pantalla.textContent !== "NaN") {
                primerNumero = pantalla.textContent;
                operador = onClickBtn;
                escribiendoSegundoNumero = true;
            }
            return;
        }        

        if (escribiendoSegundoNumero) {
            pantalla.textContent = onClickBtn;
            escribiendoSegundoNumero = false;
        } else {
            if (pantalla.textContent === "0" || pantalla.textContent === "error" || pantalla.textContent === "NaN") {
                pantalla.textContent = onClickBtn;
            } else {
                pantalla.textContent += onClickBtn;
            }
        }

        if (operador !== '') {
            segundoNumero = pantalla.textContent;
        }
    });
});