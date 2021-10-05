const inputBuscar = document.getElementById('input-cancelar');
const btnBuscar = document.getElementById('btn-buscar-cancelar');
const divTicket = document.querySelector('.div_eliminar');
const btnCancelar = document.getElementById('btn-cancelar-cita');

// Creamos los elementos
let ticketID = document.createElement('h3');
let ticketHour = document.createElement('h3');
let ticketDate = document.createElement('h3');

// Llamamos al back end
let coleccionCitas = [];
let citaID;

const inicializarColeccion = async() => {
    // coleccionCitas = await obtenerDatos('http://localhost:3000/api/obtener-citas');
    coleccionCitas = await obtenerDatos('https://gym-ticket.herokuapp.com/api/obtener-citas');
    const encontrarCita = ()=>{
        
        let contadorBusquedas = 0;

        coleccionCitas.forEach(cita => {

            if((cita.tiquete === inputBuscar.value) || (cita.tiquete.toLowerCase() === inputBuscar.value)){

                // Asignamos sus valores
                ticketID.innerText = cita.tiquete;
                ticketHour.innerText = cita.hora;
                ticketDate.innerText = cita.fecha;

                // Los mostramos en la UI
                divTicket.appendChild(ticketID);
                divTicket.appendChild(ticketHour);
                divTicket.appendChild(ticketDate);

                btnCancelar.classList.remove('ocultar');

                citaID = cita._id;
                console.log('CITA ID: '+citaID);
                console.log('Ticket: '+cita.tiquete);
            }else{
                contadorBusquedas++;
            }
        });

        if(contadorBusquedas==coleccionCitas.length){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontró la cita! Intenta usar sólo mayúsculas'
            }).then(()=>{
                if(divTicket.children.length>0){
                    
                    // Los quitamos de la UI
                    divTicket.removeChild(ticketID);
                    divTicket.removeChild(ticketHour);
                    divTicket.removeChild(ticketDate);
                }
            });
        }
    };

    const cancelarCita = async () => {
        Swal.fire(
            'Gracias!',
            'Su cita ha sido cancelada!',
            'success',
            enviarDatos()
        ).then(() =>{
            window.location.href='index.html';
            // Hacer responsive
        });
    };
    
    const enviarDatos = async()=>{
        let dataJSON = {
            id: citaID
        }
        // eliminarCitas = await eliminarDatos('http://localhost:3000/api/eliminar-citas', dataJSON);
        eliminarCitas = await eliminarDatos('https://gym-ticket.herokuapp.com/api/eliminar-citas', dataJSON);
    }

    btnCancelar.addEventListener('click', cancelarCita);
    btnBuscar.addEventListener('click', encontrarCita);
};

inicializarColeccion();