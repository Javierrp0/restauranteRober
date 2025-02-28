# Sistema de Reservas y Pedidos  

Este proyecto permite gestionar reservas y pedidos de manera sencilla a través de una interfaz web. A continuación, se detallan las funcionalidades disponibles en cada sección de la aplicación.  

---

## Tecnologías Utilizadas  
- **Frontend:**  
  - HTML  
  - CSS  
  - JavaScript  

- **Backend:**  
  - Express (Node.js)  

- **Base de Datos:**  
  - MongoDB  

- **Despliegue:**  
  - Vercel  

---

## Pantalla Principal  
En la pantalla principal, se encuentran:  
- **Dos recuadros** para navegar hacia:  
  - **Reservas**  
  - **Pedidos**  
- **Cabecera** con:  
  - Ícono para regresar a la página principal.  
  - Ícono para iniciar sesión.  

---

## Reservas  
### Funcionalidades  
- Se puede realizar una reserva **sin necesidad de iniciar sesión**.  
- Al realizar una reserva, se solicita:  
  - **Nombre**  
  - **Número de mesa disponible**  
- Si el usuario **ha iniciado sesión**, podrá:  
  - Ver sus reservas realizadas, incluyendo:  
    - Número de mesa.  
    - Estado de la reserva.  
  - Si el **administrador completa la reserva**, esta dejará de estar visible para el usuario.  

---

## Pedidos  
### Funcionalidades  
- Se pueden realizar pedidos y visualizar los pedidos realizados por el usuario.  
- Al visualizar un pedido, se muestra:  
  - **ID del pedido**  
  - **Platos solicitados**  
  - **Estado del pedido**, el cual se actualizará conforme el administrador gestione el proceso.  

### Proceso para Realizar un Pedido  
1. **Visualización de Platos:**  
   - Se despliegan los platos disponibles.  
   - Se puede navegar entre ellos utilizando **flechas laterales**.  
2. **Selección de Platos:**  
   - Se incluye un **selector** que muestra los platos añadidos al pedido.  
   - Se pueden **eliminar** platos del pedido desde el selector.  
3. **Confirmación de Pedido:**  
   - Para confirmar el pedido, el usuario **debe iniciar sesión**.  
   - Si no ha iniciado sesión:  
     - Se redirigirá a la página de **Login**, donde se solicitará:  
       - **Nombre de usuario**  
       - **Contraseña**  
     - Si el usuario **no existe**, se creará una nueva cuenta automáticamente.  

---

## Instalación y Ejecución  
1. Clona el repositorio:  
    ```bash
    git clone <url-del-repositorio>
    cd <nombre-del-proyecto>
    ```
2. Instala las dependencias:  
    ```bash
    npm install
    ```
3. Inicia la aplicación:  
    ```bash
    npm start
    ```
---

## ☁️ Despliegue  
Este proyecto está desplegado en **Vercel**, lo que permite un acceso rápido y escalable a la aplicación.  
