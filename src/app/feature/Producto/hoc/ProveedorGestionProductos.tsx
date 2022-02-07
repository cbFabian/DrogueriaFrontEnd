import {
  agregarNuevoProducto,
  listarProductosAsync,
} from 'app/core/redux/acciones/productos/ProductosAcciones';
import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
import { GestionProductos } from '../containers/GestionProductos';
import { connect } from 'react-redux';

const mapStateToProps = ({productos, usuario}: EstadoGeneral) => {
  return {productos, usuario};
};

export const ProveedorGestionProductos = connect(mapStateToProps, {
  listarProductos: listarProductosAsync,
  agregarNuevoProducto,
})(GestionProductos);
