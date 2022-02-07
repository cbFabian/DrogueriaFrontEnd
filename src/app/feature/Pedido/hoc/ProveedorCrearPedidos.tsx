import {
    agregarPedidoUsuarioAsync,
    validarDiaFestivoAsync,
  } from 'app/core/redux/acciones/pedido/PedidosAcciones';
  import { listarProductosAsync } from 'app/core/redux/acciones/productos/ProductosAcciones';
  import { listarReunionesAsync } from 'app/core/redux/acciones/reunion/ReunionAcciones';
  import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
  import { CrearPedidos } from '../containers/CrearPedidos';
  import { connect } from 'react-redux';
  
  const mapStateToProps = ({pedidos, usuario, productos, reuniones}: EstadoGeneral) => {
    return {pedidos, usuario, productos, reuniones};
  };
  
  export const ProveedorCrearPedidos = connect(mapStateToProps, {
    agregarPedidoUsuario: agregarPedidoUsuarioAsync,
    listarProductos: listarProductosAsync,
    listarReuniones: listarReunionesAsync,
    validarDiaFestivo: validarDiaFestivoAsync,
  })(CrearPedidos);
