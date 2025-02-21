//PETICION PARA HACER PEDIDO

//PETICION PARA OBTENER MIS PEDIDOS

//peticion para obtener platos

$(document).ready(function () {
    const apiUrl = "http://127.0.0.1:5000";

    let platos = [];
    let platosSeleccionados = [];
    let indiceActual = 0;

    //obtiene los platos
    function obtenerPlatos() {
        $.ajax({
            url: `${apiUrl}/api/platos`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                platos = data;
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
                    <img src="${plato.imagen}" alt="${plato.nombre}">
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
            alert("Por favor, selecciona un plato para quitar.");
        }
    });

    obtenerPlatos();

});