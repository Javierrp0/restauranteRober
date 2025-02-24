$(document).ready(function () {
    const apiUrl = "http://localhost:5000";

    //funcion para verificar autenticacion
    function verificarAutenticacion() {
        return localStorage.getItem('nombreUsuario') !== null;
    }

    //si esta logeado se añade directamente el nombre del usuario
    if (verificarAutenticacion()) {
        $("#usuario").val(localStorage.getItem('nombreUsuario')).prop('disabled', true);
    }

    //funcion para obtener mesas disponibles
    function obtenerMesasDisponibles() {
        $.ajax({
            url: `${apiUrl}/api/usuario/obtenerMesas`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const opciones = data.map(mesa => 
                    `<option value="${mesa.id}">Mesa ${mesa.id}</option>`
                ).join('');
                $("#mesasDisponibles").append(opciones);
            },
            error: function () {
                console.log("Error al obtener las mesas disponibles")
            }
        });
    }

    //funcionalidad para crear reserva
    $('#botonHacerReserva').on('click', function () {
        const propietario = localStorage.getItem('nombreUsuario');
        const usuario = $("#usuario").val().trim();
        const mesa = $("#mesasDisponibles").val().trim();

        if (!mesa) {
            alert("Debes escoger una mesa");
            return;
        }

        const nombreReserva = propietario ? propietario : usuario;

        if (!nombreReserva) {
            alert("Debes ingresar un nombre de usuario");
            return;
        }

        const reserva = {
            propietario: nombreReserva,
            mesa: mesa,
        };

        $.ajax({
            url: `${apiUrl}/api/usuario/crearReserva`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reserva),
            success: function (data) {
                alert("Reserva creada con exito");
                location.reload();
            },
            error: function () {
                alert("Error al crear la reserva");
            }
        });
    });

    //funcion para obetener reserva del usuario y añadirlos para la visualizacion
    function obtenerReservas() {
        if (!verificarAutenticacion()) {
            $('.reservas').html("<br><p>Debes iniciar sesión para ver tus reservas</p>");
            return;
        }

        const propietario = localStorage.getItem('nombreUsuario');

        $.ajax({
            url: `${apiUrl}/api/usuario/obtenerReservas?propietario=${propietario}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const reservasHtml = data.map(reserva => {
                    return `
                        <div class="reserva">
                            <h3>Reserva #${reserva.id}</h3>
                            <p>Mesa: ${reserva.mesa}</p>
                            <p>Estado: ${reserva.estado}</p>
                        </div> <br>
                    `;
                }).join('');
                $('.reservas').html(reservasHtml);
            },
            error: function () {
                alert("Error al obtener las reservas");
            }
        });
    }

    obtenerMesasDisponibles()
    obtenerReservas()
});