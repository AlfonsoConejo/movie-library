import { useEffect, useState } from 'react';

export default function useCarousel(constructorUrl, deps = []) {
    const [cargado, setCargado] = useState(false);
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        const url = constructorUrl();
        setCargado(false);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPeliculas(data.results); // actualiza el array de películas
                setCargado(true);           // actualiza que terminó de cargar
            })
            .catch(err => console.error(err));
    }, [...deps]); // <- spread para que dependa de los valores internos del arreglo

    return { peliculas , cargado};
}