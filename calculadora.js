// const pantalla = document.querySelector(".pantalla");
// const botones = document.querySelectorAll(".btn");

// let parentesis = false
// let signoOperacion = false
// let primerNumero = '';
// let operador = '';
// let segundoNumero = '';
// let escribiendoSegundoNumero = false;

// botones.forEach(boton => {
//     boton.addEventListener("click", () => {
//         const onClickBtn = boton.textContent;

//         if (boton.id === "c") {
//             pantalla.textContent = "0";
//             primerNumero = '';
//             operador = '';
//             segundoNumero = '';
//             escribiendoSegundoNumero = false;
//             return;
//         }        

//         if (boton.id === "igual") {
//             if (primerNumero !== '' && operador !== '' && segundoNumero !== '') {
//                 try {
//                     let resultado = eval(`${primerNumero} ${operador} ${segundoNumero}`);
//                     let resultadoRedondeado = parseFloat(resultado.toFixed(6));
//                     pantalla.textContent = resultadoRedondeado;
//                     primerNumero = resultadoRedondeado.toString();
//                     operador = '';
//                     segundoNumero = '';
//                     escribiendoSegundoNumero = false;
//                 } catch {
//                     pantalla.textContent = "error";
//                 }
//             }
//             return;
//         }

//         if (boton.id === "signo") {

//             if (signoOperacion === false) {
//                 pantalla.textContent = - + pantalla.textContent
//                 signoOperacion = false
//             }
//             else if (signoOperacion === true) {
//                 pantalla.textContent = + + pantalla.textContent
//                 signoOperacion = true

//             } 
//             return
//         }

//         if (boton.id === "porcentaje") {
//             pantalla.textContent = pantalla.textContent / 100;
//             return;
//         }

//         // if (boton.id === "parentesis"){
//         //     if (parentesis === false){
//         //         pantalla.textContent += "("
//         //         parentesis = true
//         //     } 
//         //     else if (parentesis === true){
//         //         pantalla.textContent += ")"
//         //         parentesis = false
//         //     }
//         //     return
//         // }

//         if (boton.classList.contains("operador")) {
//             if (pantalla.textContent !== "0" && pantalla.textContent !== "error" && pantalla.textContent !== "NaN") {
//                 primerNumero = pantalla.textContent;
//                 operador = onClickBtn;
//                 escribiendoSegundoNumero = true;
//             }
//             return;
//         }        

//         if (escribiendoSegundoNumero) {
//             pantalla.textContent = onClickBtn;
//             escribiendoSegundoNumero = false;
//         } else {
//             if (pantalla.textContent === "0" || pantalla.textContent === "error" || pantalla.textContent === "NaN") {
//                 pantalla.textContent = onClickBtn;
//             } else {
//                 pantalla.textContent += onClickBtn;
//             }
//         }

//         if (operador !== '') {
//             segundoNumero = pantalla.textContent;
//         }
//     });
// });

const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let primerNumero = '';
let operador = '';
let segundoNumero = '';
let escribiendoSegundoNumero = false;

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const onClickBtn = boton.textContent;

        // Botón de borrar todo
        if (boton.id === "c") {
            pantalla.textContent = "0";
            primerNumero = '';
            operador = '';
            segundoNumero = '';
            escribiendoSegundoNumero = false;
            return;
        }

        // Botón de borrar el último dígito
        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "error" || pantalla.textContent === "NaN") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        // Botón de igual para evaluar la expresión
        if (boton.id === "igual") {
            if (primerNumero !== '' && operador !== '' && segundoNumero !== '') {
                try {
                    // Evaluar la expresión completa
                    let resultado = eval(`${primerNumero} ${operador} ${segundoNumero}`);
                    let resultadoRedondeado = parseFloat(resultado.toFixed(6));
                    pantalla.textContent = resultadoRedondeado;
                    // Preparar para la siguiente operación usando el resultado obtenido
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

        // Botón de cambiar signo
        if (boton.id === "signo") {
            if (pantalla.textContent !== "0" && pantalla.textContent !== "error" && pantalla.textContent !== "NaN") {
                if (pantalla.textContent.startsWith('-')) {
                    pantalla.textContent = pantalla.textContent.slice(1);
                } else {
                    pantalla.textContent = '-' + pantalla.textContent;
                }

                if (escribiendoSegundoNumero) {
                    segundoNumero = pantalla.textContent;
                } else {
                    primerNumero = pantalla.textContent;
                }
            }
            return;
        }

        // Botón de porcentaje
        if (boton.id === "porcentaje") {
            pantalla.textContent = (parseFloat(pantalla.textContent) / 100).toString();
            if (escribiendoSegundoNumero) {
                segundoNumero = pantalla.textContent;
            } else {
                primerNumero = pantalla.textContent;
            }
            return;
        }
        if (boton.id === "raizCuadrada") {
            let resultado = Math.sqrt(pantalla.textContent)
            let resultadoRedondeado = parseFloat(resultado.toFixed(6));
            pantalla.textContent = resultadoRedondeado;
            return
        }

        // Manejo de operadores (+, -, *, /)
        if (boton.classList.contains("operador")) {
            if (pantalla.textContent !== "0" && pantalla.textContent !== "error" && pantalla.textContent !== "NaN") {
                if (!escribiendoSegundoNumero) {
                    // Almacenar el primer número y el operador
                    primerNumero = pantalla.textContent;
                    operador = onClickBtn;
                    escribiendoSegundoNumero = true;
                    pantalla.textContent = "0"; // Reiniciar pantalla para escribir el segundo número
                } else {
                    // Evaluar la expresión actual y preparar para la siguiente operación
                    try {
                        segundoNumero = pantalla.textContent;
                        let resultado = eval(`${primerNumero} ${operador} ${segundoNumero}`);
                        let resultadoRedondeado = parseFloat(resultado.toFixed(6));
                        pantalla.textContent = resultadoRedondeado;
                        primerNumero = resultadoRedondeado.toString();
                        operador = onClickBtn;
                        segundoNumero = '';
                        pantalla.textContent = "0"; // Reiniciar pantalla para escribir el siguiente número
                    } catch {
                        pantalla.textContent = "error";
                    }
                }
            }
            return;
        }

        // Manejo de números y puntos
        if (escribiendoSegundoNumero) {
            if (pantalla.textContent === "0" || pantalla.textContent === "error" || pantalla.textContent === "NaN") {
                pantalla.textContent = onClickBtn;
            } else {
                pantalla.textContent += onClickBtn;
            }
            segundoNumero = pantalla.textContent;
        } else {
            if (pantalla.textContent === "0" || pantalla.textContent === "error" || pantalla.textContent === "NaN") {
                pantalla.textContent = onClickBtn;
            } else {
                pantalla.textContent += onClickBtn;
            }
            primerNumero = pantalla.textContent;
        }
    });
});