$(document).ready(function () {
    // const apiUrl = "http://localhost:5000";
    const apiUrl = "https://api-restaurante-robert-sand.vercel.app";

    $('#botonInciarSesion').on('click', function (event) {
        event.preventDefault();

        const nombre = $('#nombreUsuario').val().trim();
        const contraseña = $('#contraseña').val().trim();

        if (nombre === "" || contraseña === "") {
            alert("Completa todos los campos");
            return;
        }

        //peticion para 
        $.ajax({
            url: `${apiUrl}/api/usuario/iniciarSesion`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({nombre, contraseña }),
            success: function (response) {
                alert(response.mensaje);
                if (response.exito) {
                    //guarda el nombre de usuario en localStorage
                    localStorage.setItem('nombreUsuario', nombre);
                    //redirige a los pedidos
                    window.location.href = "index.html";
                }
            },
            error: function (error) {
                alert("Error al iniciar sesion o registrar el usuario");
                console.log(error);
            }
        });
    });
});