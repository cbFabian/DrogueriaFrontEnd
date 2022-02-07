import * as PropTypes from 'prop-types';
import * as React from 'react';
import { H2MensajeExito } from './styles';

interface MostrarMensajeProps {
  mensaje: string;
}

export const MostrarMensaje: React.FC<MostrarMensajeProps> = ({
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

MostrarMensaje.propTypes = {
  mensaje: PropTypes.string.isRequired,
};
