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

// Regex que acepta todas las letras latinas (mayúsculas, minúsculas, acentos, eñes),
// números, espacios y signos de puntuación comunes
const LATIN_REGEX = /^[\p{Script=Latin}0-9\s.,'"?!:;()\-–—¡¿]*$/u;

function getLatinOption(main, fallback) {
    // Si main no existe, devolvemos fallback sin validar regex
    if (!main) return fallback;

    // Si fallback no existe, devolvemos main sin validar
    if (!fallback) return main;


    try {
        if (LATIN_REGEX.test(main)) {
            // main es válido, retornamos main
            return main;
        } else {
            // main contiene caracteres fuera de las letras latinas permitidas, usamos fallback
            return fallback;
        }
    } catch (err) {
        console.error("Regex falló con:", main, err);
        return fallback; // no rompe todo el proceso
    }
}


export {convertirFecha, convertirAFechaConDiagonal, convertirAFechaCompleta, convertirMinutosAHoras, sliceYear, traduccionesOcupacion, LATIN_REGEX , getLatinOption};
