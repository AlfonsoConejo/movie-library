function convertirFecha(fecha){
    const opciones = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }

    const fechaFormateada = new Date(fecha).toLocaleDateString("es-MX", opciones).toLowerCase();
    return fechaFormateada;
}

function convertirAFechaConDiagonal(fecha) {
  const opciones = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return new Date(fecha).toLocaleDateString("es-MX", opciones);
}

function convertirAFechaCompleta(fecha){
    const opciones = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }

    const fechaFormateada = new Date(fecha).toLocaleDateString("es-MX", opciones).toLowerCase();
    return fechaFormateada;
}

function convertirMinutosAHoras(tiempo){
    //Obtenemos las horas
    const horas = Math.floor(tiempo / 60);
    //Obtenemos los minutos
    const minutos = tiempo % 60; 

    if (minutos > 0 ){
        return `${horas}h ${minutos}m`;
    } else{
        return `${horas}h`;
    }
}

function sliceYear(fecha){
let year = fecha.slice(0, 4);
return year;
}

const traduccionesOcupacion = {
  Acting: 'Actuación',
  Directing: 'Dirección',
  Production: 'Producción',
  Writing: 'Guion',
  Editing: 'Edición',
  Camera: 'Cámara',
  Sound: 'Sonido',
  Art: 'Arte',
  Crew: 'Equipo técnico'
};

//Regex de caracteres latinos
const LATIN_REGEX = /^[A-Za-zÀ-ÿ0-9\s.,'"?!:;()\-–—¡¿]*$/;

function getLatinOption(main, fallback) {
    //console.log("Evaluamos el siguiente nombre:", main);

    if (!main || !fallback) return false;

    try {
        if (LATIN_REGEX.test(main)) {
            //console.log("Nos quedamos la primera opción", main);
            return main;
        } else {
            //console.log("Nos quedamos la segunda opción", fallback);
            return fallback;
        }
    } catch (err) {
        console.error("Regex falló con:", main, err);
        return fallback; // no para todo el proceso
    }
}

export {convertirFecha, convertirAFechaConDiagonal, convertirAFechaCompleta, convertirMinutosAHoras, sliceYear, traduccionesOcupacion, LATIN_REGEX , getLatinOption};
