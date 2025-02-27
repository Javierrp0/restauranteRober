$(document).ready(function () {
    // const apiUrl = "http://localhost:5000";
    const apiUrl = "https://api-restaurante-robert-sand.vercel.app";

    let platos = [];
    let platosSeleccionados = [];
    let indiceActual = 0;

    //funcion para verificar autenticacion
    function verificarAutenticacion() {
        return localStorage.getItem('nombreUsuario') !== null;
    }

    //funcion para crear pedido
    $('#botonHacerPedido').on('click', function () {
        if (!verificarAutenticacion()) {
            alert("Debes iniciar sesión para hacer un pedido");
            window.location.href = "../login.html";
        }

        const propietario = localStorage.getItem('nombreUsuario');
        const pedido = {
            propietario: propietario,
            platos: platosSeleccionados,
        };

        $.ajax({
            url: `${apiUrl}/api/usuario/crearPedido`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(pedido),
            success: function (data) {
                alert("Pedido creado con exito");
                platosSeleccionados = [];
                actualizarListaSeleccionados();
                obtenerPedidos();
            },
            error: function () {
                alert("Error al crear el pedido");
            }
        });
    });

    //funcion para obetener pedidos del usuario y añadirlos para la visualizacion
    function obtenerPedidos() {
        if (!verificarAutenticacion()) {
            $('.pedidos').html("<br><p>Debes iniciar sesión para ver tus pedidos</p>");
            return;
        }

        const propietario = localStorage.getItem('nombreUsuario');

        $.ajax({
            url: `${apiUrl}/api/usuario/obtenerPedidos/${propietario}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.length === 0) {
                    $('.pedidos').html("<br><p>No tienes pedidos actualmente</p>");
                } else {
                    const pedidosHtml = data.map(pedido => {
                        return `
                        <br>
                            <div class="linea"></div>
                            <div class="pedido">
                                <p>Pedido #${pedido.id}</p>
                                <p>Platos: ${pedido.platos.map(plato => plato.nombre).join(', ')}</p>
                                <p>Estado: ${pedido.estado}</p>
                            </div>
                        `;
                    }).join('');
                    $('.pedidos').html(pedidosHtml);
                }
            },
            error: function () {
                alert("Error al obtener los pedidos");
            }
        });
    }

    //obtiene los platos
    function obtenerPlatos() {
        $.ajax({
            url: `${apiUrl}/api/obtenerPlatos`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                platos = data;
                mostrarPlato(indiceActual);
            },
            error: function () {
                console.log("Error al obtener los platos");
            }
        });
    }

    //muestra el plato actual
    function mostrarPlato(indice) {
        if (platos.length > 0) {
            const plato = platos[indice];
            $('.verPlatos').html(`
                <div class="plato">
                    <div class="navegacion">
                        <a class="anterior"><img src="../../imagenes/flechaIzq.png"></a>
                        <img src="${plato.url_imagen}" id="imgPlato" alt="${plato.nombre}">
                        <a class="siguiente"><img src="../../imagenes/flechaDer.png"></a>
                    </div>
                    <p>${plato.nombre}</p>
                    <p>Precio: ${plato.precio} €</p>
                    <button class="añadirLista">Añadir a la lista</button>
                </div>
            `);
        }
    }

    //funcionalidad para navegar entre platos
    $(document).on('click', '.siguiente', function () {
        indiceActual = (indiceActual + 1) % platos.length;
        mostrarPlato(indiceActual);
    });

    $(document).on('click', '.anterior', function () {
        indiceActual = (indiceActual - 1 + platos.length) % platos.length;
        mostrarPlato(indiceActual);
    });

    //funcionalidad para añadir plato a la lista de seleccionados
    $(document).on('click', '.añadirLista', function () {
        const platoActual = platos[indiceActual];
        platosSeleccionados.push(platoActual);
        actualizarListaSeleccionados();
    });

    //funcionalida para mostrar la lista de seleccionados en el SELECT
    function actualizarListaSeleccionados() {
        const select = $('#platosYaSeleccionados');
        select.empty();
        select.append(`<option value="">Escoge un plato</option>`);

        platosSeleccionados.forEach((plato, index) => {
            select.append(`
                <option value="${index}">${plato.nombre}</option>
            `);
        });
    }

    //funcionalidad para quitar plato de la lista de seleccionados
    $('#quitarPlato').on('click', function () {
        const indice = $('#platosYaSeleccionados').val();

        if (indice !== "") {
            platosSeleccionados.splice(indice, 1);
            actualizarListaSeleccionados();
        } else {
            alert("Por favor, selecciona un plato para quitar");
        }
    });

    obtenerPlatos();
    obtenerPedidos();
});