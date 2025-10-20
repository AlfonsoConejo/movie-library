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

export {convertirFecha, convertirAFechaConDiagonal, convertirMinutosAHoras, sliceYear};
