// Aquí va el código para filtrar tiquetes
const inputTiquete = document.getElementById('filtrar-tiquete');
const btnTquete = document.getElementById('btn-filt-tiq');
const fechaInicio = document.getElementById('fecha-inicio');
const fechaFin = document.getElementById('fecha-fin');
const btnFecha = document.getElementById('btn-filt-fecha');
const citasContainer = document.getElementById('div-citas-existentes');

// Llamamos al back end
let coleccionCitas = [];

const inicializarColeccion = async() => {
    // coleccionCitas = await obtenerDatos('http://localhost:3000/api/obtener-citas');
    coleccionCitas = await obtenerDatos('https://gym-ticket.herokuapp.com/api/obtener-citas');
    mostrarCitas();

    // Funciones filtrar
    const tiquetes = document.querySelectorAll('#div-citas-existentes .tiquete');

    const filtrarTiquete = ()=>{
        tiquetes.forEach(tiquete => {
            if((tiquete.children[0].textContent.includes(inputTiquete.value)) || (tiquete.children[0].textContent.toLowerCase().includes(inputTiquete.value))){
                tiquete.classList.remove('ocultar')
            }else{
                tiquete.classList.add('ocultar')
            }
        });
    };

    const filtrarFecha = ()=>{
        console.log('Filtrando por fecha');
        tiquetes.forEach(tiquete => {
            if(tiquete.children[2].textContent>=fechaInicio.value && tiquete.children[2].textContent<=fechaFin.value){
                tiquete.classList.remove('ocultar')
            }else{
                tiquete.classList.add('ocultar')
            }
        });
    };

    btnTquete.addEventListener('click', filtrarTiquete);
    btnFecha.addEventListener('click', filtrarFecha);
};

// Creación dinamica de las citas en la BD
/* <div class="citas_titulo tiquete">
    <h2>0650</h2>
    <h2>6:50</h2>
    <h2>2021-10-02</h2>
</div> */
const mostrarCitas = ()=>{

    coleccionCitas.forEach(cita => {
        
        // Creamos los elementos
        let divTicket = document.createElement('div');
        let ticketID = document.createElement('h2');
        let ticketHour = document.createElement('h2');
        let ticketDate = document.createElement('h2');

        // Asignamos sus valores
        divTicket.classList.add('citas_titulo');
        divTicket.classList.add('tiquete');
        // divTicket.setAttribute('id', 'tiqueteDiv')
        ticketID.innerText = cita.tiquete;
        ticketHour.innerText = cita.hora;
        ticketDate.innerText = cita.fecha;

        // Los mostramos en la UI
        citasContainer.appendChild(divTicket);
        divTicket.appendChild(ticketID);
        divTicket.appendChild(ticketHour);
        divTicket.appendChild(ticketDate);
    });
};

window.addEventListener('load', ()=>{
    fechaInicio.addEventListener('blur', ()=>{
        fechaInicio.type = 'text';
    });
    fechaFin.addEventListener('blur', ()=>{
        fechaFin.type = 'text';
    });

    fechaInicio.addEventListener('focus', ()=>{
        fechaInicio.type = 'date';
    });
    fechaFin.addEventListener('focus', ()=>{
        fechaFin.type = 'date';
    });
});
inicializarColeccion();