import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { Producto } from '../../models/Producto';

interface BtnEliminarProductoProps {
  onEliminar: (producto: Producto) => any;
  producto: Producto;
}

export const BtnEliminarProducto: React.FC<BtnEliminarProductoProps> = ({
  onEliminar,
  producto,
}) => {
  const handleEliminar = () => onEliminar(producto);
  return (
    <Button onClick={handleEliminar}>
      <span role="img" aria-labelledby="trash">
        🗑️
      </span>
    </Button>
  );
};

BtnEliminarProducto.propTypes = {
  producto: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    detalle: PropTypes.string.isRequired,
  }).isRequired,
  onEliminar: PropTypes.func.isRequired,
};
