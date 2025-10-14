function convertirFecha(fecha){
    const opciones = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }

    const fechaFormateada = new Date(fecha).toLocaleDateString("es-MX", opciones).toLowerCase();
    return fechaFormateada;
}

export default convertirFecha;
