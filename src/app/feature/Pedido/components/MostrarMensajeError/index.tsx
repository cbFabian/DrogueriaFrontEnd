import * as PropTypes from 'prop-types';
import * as React from 'react';
import { H2MensajeExito } from './styles';

interface MostrarMensajeErrorProps {
  mensajeError: string;
}

export const MostrarMensajeError: React.FC<MostrarMensajeErrorProps> = ({
    mensajeError,
}) => {
  if (mensajeError === '') {
    return null;
  }

  return (
    <div>
        <H2MensajeExito>
            {mensajeError}
        </H2MensajeExito>
    </div>
  );
};

MostrarMensajeError.propTypes = {
  mensajeError: PropTypes.string.isRequired,
};
