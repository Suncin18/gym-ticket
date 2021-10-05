// Elementos del DOM
const inputDate = document.getElementById('input-date');
const inputTime = document.getElementById('input-time');
const btnAgendar = document.getElementById('btn');

// Variables de JS
let exito = false;
const hoy = new Date();

// Funciones
const formatoHora = ()=>{
    let hora;
    let minutos;
    let horaActual;

    if(hoy.getHours()<10){
        hora = '0'+hoy.getHours();
    }else{
        hora = hoy.getHours();
    }

    if(hoy.getMinutes()<10){
        minutos = '0'+hoy.getMinutes();
    }else{
        minutos = hoy.getMinutes();
    }

    horaActual = hora+':'+minutos;

    return horaActual;
};
const hora = formatoHora();

const formatoFecha = (fecha, formato) => {

    // Agregamos un 0 al mes
    let mesActual = fecha.getMonth()+1;
    let mesReplazado = mesActual;
    if(mesActual<10){
        mesReplazado = '0'+mesActual;
    }

    // Agregamos un 0 al día
    let diaActual = fecha.getDate();
    let diaReplazado = diaActual;
    if(diaActual<10){
        diaReplazado = '0'+diaActual;
    }
    const fechaActual = formato.replace('mm', mesReplazado)
    .replace('yy', fecha.getFullYear())
	.replace('dd', diaReplazado);	
    return fechaActual;
};
const fechaHoy = formatoFecha(hoy, 'yy-mm-dd');

const agendar = ()=>{
    console.log('hora actual: '+hora)
    console.log('hora del input: '+inputTime.value);

    // Validamos fecha
    if(inputDate.value<fechaHoy){
        exito = false;
    }else if(inputDate.value==fechaHoy){
        
        // Validamos hora
        if(inputTime.value<hora){
            exito = false;
        }else{
            exito = true;
        }
    }else if(inputDate.value>fechaHoy){
        exito = true;
    }

    // Mostramos los alerts correspondientes
    if(exito==false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La fecha u hora no son válidas',
        })
    }else{
        // Swal.fire(
        //     'Gracias!',
        //     'Tu cita ha sido agendada!',
        //     'success'
        // ).then(()=>{
        let data = {
            fecha: inputDate.value,
            hora: inputTime.value
        };
        // registrarDatos('http://localhost:3000/api/registrar-citas', data);
        registrarDatos('https://gym-ticket.herokuapp.com/api/registrar-citas', data);
        inputDate.value = '';
        inputTime.value = '';
        // });
    }
};

// Eventos
window.addEventListener('load', ()=>{
    inputDate.addEventListener('blur', ()=>{
        inputDate.type = 'text';
    });
    inputTime.addEventListener('blur', ()=>{
        inputTime.type = 'text';
    });

    inputDate.addEventListener('focus', ()=>{
        inputDate.type = 'date';
    });
    inputTime.addEventListener('focus', ()=>{
        inputTime.type = 'time';
    });
});
btnAgendar.addEventListener('click', agendar);