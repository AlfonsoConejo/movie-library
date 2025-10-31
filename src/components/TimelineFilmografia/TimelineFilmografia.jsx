import './TimelineFilmografia.css';
import { useContext } from 'react';
import { traduccionesOcupacion } from '../../utils';
import { creditosCombinadosContexto } from '../../paginas/movie';
import { useNavigate } from 'react-router-dom';

const TimelineFilmografia = () => {
  const navigate = useNavigate(); 
  // Obtenemos la información del contexto
  const { creditosCombinados } = useContext(creditosCombinadosContexto);

  // Combinamos los arreglos de cast & crew
  const combinados = [
    ...(creditosCombinados.cast || []),
    ...(creditosCombinados.crew || []),
  ];

  // Agrupar por departamento
  const agrupados = combinados.reduce((acc, item) => {
    const key = item.department || (item.character ? 'Actuación' : 'Otro');
    const deptoTraducido = traduccionesOcupacion[key] || key;

    if (!acc[deptoTraducido]) acc[deptoTraducido] = [];
    acc[deptoTraducido].push(item);
    return acc;
  }, {});

  // Ordenar por fecha (más recientes primero)
  const ordenarPorFecha = (a, b) => {
    const fechaA = new Date(a.release_date || a.first_air_date || 0);
    const fechaB = new Date(b.release_date || b.first_air_date || 0);
    return fechaB - fechaA;
  };

  // 🟢 IMPORTANTE: aquí envuelves todo el contenido en un fragment (<>...</>)
  return (
    <>
      {Object.entries(agrupados).map(([depto, trabajos]) => (
        <div key={depto} className="tabla-departamento">
          <h2>{depto}</h2>
          <table>
            <tbody>
              {trabajos.sort(ordenarPorFecha).map((trabajo) => (
                <tr key={`${trabajo.id}-${trabajo.job || trabajo.character}`}>
                  <td className="fila-grid">
                    <div className="izquierda">
                      {trabajo.release_date?.slice(0, 4) ||
                      trabajo.first_air_date?.slice(0, 4) ||
                      '—'}
                    </div>
                    <div className="derecha-arriba">
                      <span onClick={() => navigate(`/${trabajo.media_type}/${trabajo.id}`)}>
                        {trabajo.title || trabajo.name}
                      </span>
                    </div>
                    <div className="derecha-abajo">{trabajo.character || trabajo.job}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default TimelineFilmografia;