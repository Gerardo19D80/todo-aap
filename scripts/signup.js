window.addEventListener('load', function () {
    /* ---------------------- 1. obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    // const form = document.querySelector("forms");
    const nombre = document.getElementById("inputNombre");
    const apellido = document.getElementById("inputApellido");
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const url = "https://todo-api.ctd.academy/v1";

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const payload = {
            firstName: nombre.value, //el.value captura cada uno de los elementos que se encuentran dentro de los imputs.
            lastName: apellido.value,
            email: email.value,
            password: password.value
          }
    //console.log(payload); // ------------- prueba de que funciona el payload

    // ------------- configuramos la request del Fetch

    const settings = {
        method: "POST",
        body: JSON.stringify(payload), 
        headers: {
                'Content-Type': 'application/json'
        }
    }

    // ------------- lanzar la consulta a la API

    realizarRegister(settings);

    // ------------- reset del form para limpiar los campos del formulario

    form.reset()


    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        
        fetch (`${url}/users`, settings)
        .then( respuesta => {
                console.log(respuesta);
                if(respuesta.ok) return respuesta.json();
                return Promise.reject(respuesta);
            })
        .then (data => {
            console.log("Promesa Cumplida 😇 su jwt es: ");
            console.log(data)

            if(data.jwt){
                // guardado en el LocalStorage el objeto con el token de identidad
            localStorage.setItem("jwt", JSON.stringify(data.jwt))
                //y ahora redireccionamos con el token tomado el sign up a la pagina de mis-tareas
            location.replace("./mis-tareas.html");
            //gdaglio@gmail.com, 1234
            }

            })
        .catch( error => {
            console.log("Promesa rechazada ❌");
            console.warn(error);
            if (error.status >= 400 && error.status < 500) {
            console.warn(" El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto ");
            alert (" El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto ");
            } else if (error.status >= 500 && error.status < 600)
            console.warn("Error del servidor");
            alert ("Error del Servidor");
            })
    };
});