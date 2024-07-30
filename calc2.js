const pantalla = document.querySelector(".pantalla")
const botones = document.querySelectorAll(".btn") // al seleccionar todos, se genera un array

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const onClickBtn = boton.textContent; // textContent muestra el valor de cada boton

        if (boton.id === "c") {
            pantalla.textContent = "0";
            return // usamos return para terminar la funcion y que no ejecute el resto del codigo
        }

        if (boton.id === "borrar") {
            // este if anidado evitara que la pantalla se quede vacia y nos devuelve el 0 si borramos todos los numeros
            if (pantalla.textContent.length === 1 || pantalla.textContent === "error" || pantalla.textContent === "NaN") {
                pantalla.textContent = "0"
            }
            else {
                // usamos el metodo slice junto con 0 para la posicion 0 y -1 para que inicie a contar desde el ultimo numero insertado
                pantalla.textContent = pantalla.textContent.slice(0, -1)
            }
            return
        }

        if (boton.id === "igual") {

            try {
                // para resolver las operaciones, usamos el metodo "eval" que evalua la operacion en pantalla y la resulve al presionar el boton "igual"
                let resultado = eval(pantalla.textContent)
                /* con el  metodo parseFloat convertimos la cadena a numero
                luego con el metodo aplicaldo a la variable resultado donde hemos guardado el resultado de la operacion , reduzco la cantidad de decimales a maximo 6 en caso de que los haya */
                let resultadoRedondeado = parseFloat(resultado.toFixed(6));

                // Actualiza el contenido de la pantalla con el resultado redondeado
                pantalla.textContent = resultadoRedondeado;
            }
            catch {
                pantalla.textContent = "error"
            }
            return
        }

        if (boton.id === "signo") {
            pantalla.textContent = - + pantalla.textContent
            return
        }        

        if (pantalla.textContent === "0" || pantalla.textContent === "error" || pantalla.textContent === "NaN") {
            pantalla.textContent = onClickBtn  // esta linea sustituye el 0 por el numero apretado
        }
        else {
            pantalla.textContent += onClickBtn // usamos += para que se aniadan los numero al final de cada cifra
        }
    })
})