import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Producto } from '../../models/Producto';
import { Table } from './styles';

export interface ListaProductosProps {
  productos: Array<Producto>;
}

export const ListaProductos: React.FC<ListaProductosProps> = ({
  productos,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <td>
            <b>Nombre del Producto</b>
          </td>
          <td>
            <b>Detalles</b>
          </td>
          <td>
            <b>Precio</b>
          </td>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto: Producto) => {
          return (
            <tr key={producto.nombre}>
              <td>{producto.nombre}</td>
              <td>{`${producto.detalle} `}</td>
              <td>${`${producto.precio} `}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

ListaProductos.propTypes = {
  productos: PropTypes.array.isRequired,
};
