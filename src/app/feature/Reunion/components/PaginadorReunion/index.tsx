import * as PropTypes from 'prop-types';
import * as React from 'react';

interface PaginadorReunionProps {
  cantidadTotalReuniones: number;
  onClickCambiarPagina: (numeroPagina: number) => void;
}

const REUNION_VISIBLES_POR_PAGINA = 10;

export const PaginadorReunion: React.FC<PaginadorReunionProps> = ({
  onClickCambiarPagina,
  cantidadTotalReuniones,
}) => {
  if (cantidadTotalReuniones <= REUNION_VISIBLES_POR_PAGINA) {
    return null;
  }

  const rango = Array.from(
    Array(
      Math.ceil(cantidadTotalReuniones / REUNION_VISIBLES_POR_PAGINA)
    ).keys()
  );

  return (
    <nav>
      {rango.map((index) => {
        return (
          <button
            onClick={() => onClickCambiarPagina(index)}
            key={index.toString()}
          >
            {index + 1}
          </button>
        );
      })}
    </nav>
  );
};

PaginadorReunion.propTypes = {
  cantidadTotalReuniones: PropTypes.number.isRequired,
  onClickCambiarPagina: PropTypes.func.isRequired,
};
