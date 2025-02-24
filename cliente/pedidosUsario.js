$(document).ready(function () {
    const apiUrl = "http://localhost:5000";

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
            url: `${apiUrl}/api/usuario/obtenerPedidos?propietario=${propietario}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const pedidosHtml = data.map(pedido => {
                    return `
                        <div class="pedido">
                            <h3>Pedido #${pedido.id}</h3>
                            <p>Platos: ${pedido.platos.map(plato => plato.nombre).join(', ')}</p>
                            <p>Estado: ${pedido.estado}</p>
                        </div> <br>
                    `;
                }).join('');
                $('.pedidos').html(pedidosHtml);
            },
            error: function () {
                alert("Error al obtener los pedidos");
            }
        });
    }

    //obtiene los platos
    function obtenerPlatos() {
        $.ajax({
            url: `${apiUrl}/api/usuario/obtenerPlatos`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                platos = data;
                console.log(platos);
                mostrarPlato(indiceActual);
            },
            error: function() {
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
                    <img src="${plato.ruta_img}" alt="${plato.nombre}">
                    <h3>${plato.nombre}</h3>
                    <p>Precio: ${plato.precio} €</p>
                    <button class="añadirLista">Añadir a la lista</button>
                    <div class="navegacion">
                        <button class="anterior">⬅️</button>
                        <button class="siguiente">➡️</button>
                    </div>
                </div>
            `);
        }
    }

    //funcionalidad para navegar entre platos
    $(document).on('click', '.siguiente', function() {
        indiceActual = (indiceActual + 1) % platos.length;
        mostrarPlato(indiceActual);
    });

    $(document).on('click', '.anterior', function() {
        indiceActual = (indiceActual - 1 + platos.length) % platos.length;
        mostrarPlato(indiceActual);
    });

    //funcionalidad para añadir plato a la lista de seleccionados
    $(document).on('click', '.añadirLista', function() {
        const platoActual = platos[indiceActual];
        platosSeleccionados.push(platoActual);
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
    $('#quitarPlato').on('click', function() {
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