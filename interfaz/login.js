$(document).ready(function () {
    const apiUrl = "http://localhost:5000";

    $('#botonInciarSesion').on('click', function (event) {
        event.preventDefault();

        const nombreUsuario = $('#nombreUsuario').val().trim();
        const contraseña = $('#contraseña').val().trim();

        if (nombreUsuario === "" || contraseña === "") {
            alert("Completa todos los campos");
            return;
        }

        //peticion para 
        $.ajax({
            url: `${apiUrl}/api/usuario/iniciarSesion`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombreUsuario, contraseña }),
            success: function (response) {
                alert(response.mensaje);
                if (response.exito) {
                    //guarda el nombre de usuario en localStorage
                    localStorage.setItem('nombreUsuario', nombreUsuario);
                    //redirige a los pedidos
                    window.location.href = "pedidosUsuario.html";
                }
            },
            error: function (error) {
                alert("Error al iniciar sesion o registrar el usuario");
                console.log(error);
            }
        });
    });
});