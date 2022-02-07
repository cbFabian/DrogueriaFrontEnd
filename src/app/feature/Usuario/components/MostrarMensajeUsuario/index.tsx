import * as PropTypes from 'prop-types';
import * as React from 'react';
import { H2MensajeExito } from './styles';

interface MostrarMensajeUsuarioProps {
  mensaje: string;
}

export const MostrarMensajeUsuario: React.FC<MostrarMensajeUsuarioProps> = ({
    mensaje,
}) => {
  if (mensaje === '') {
    return null;
  }

  return (
    <div>
        <H2MensajeExito>
            {mensaje}
        </H2MensajeExito>
    </div>
  );
};

MostrarMensajeUsuario.propTypes = {
  mensaje: PropTypes.string.isRequired,
};
