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
const LATIN_REGEX = /^[\p{Script=Latin}\p{N}\p{P}\p{Zs}]+$/u;

function isLikelyLocalizedToSpanish(str) {
    if (!str) return false;
    return LATIN_REGEX.test(str);
}

export {convertirFecha, convertirAFechaConDiagonal, convertirAFechaCompleta, convertirMinutosAHoras, sliceYear, traduccionesOcupacion, isLikelyLocalizedToSpanish};
