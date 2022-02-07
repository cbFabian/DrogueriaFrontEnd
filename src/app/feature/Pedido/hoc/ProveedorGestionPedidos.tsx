import {
    listarPedidosUsuarioAsync,
    agregarPedidoUsuarioAsync,
    cancelarPedidoUsuarioAsync,
    modificarPedidoUsuarioAsync,
    validarDiaFestivoAsync,
    listarPedidos,
    irModificarPedidoUsuario,
  } from 'app/core/redux/acciones/pedido/PedidosAcciones';
  import { listarProductosAsync } from 'app/core/redux/acciones/productos/ProductosAcciones';
  import { listarReunionesAsync } from 'app/core/redux/acciones/reunion/ReunionAcciones';
  import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
  import { GestionPedidos } from '../containers/GestionPedidos';
  import { connect } from 'react-redux';
  
  const mapStateToProps = ({pedidos, usuario, productos, reuniones}: EstadoGeneral) => {
    return {pedidos, usuario, productos, reuniones};
  };
  
  export const ProveedorGestionPedidos = connect(mapStateToProps, {
    listarPedidosUsuario: listarPedidosUsuarioAsync,
    agregarPedidoUsuario: agregarPedidoUsuarioAsync,
    cancelarPedidoUsuario: cancelarPedidoUsuarioAsync,
    modificarPedidoUsuario: modificarPedidoUsuarioAsync,
    listarProductos: listarProductosAsync,
    listarReuniones: listarReunionesAsync,
    validarDiaFestivo: validarDiaFestivoAsync,
    listarPedidos,
    irModificarPedidoUsuario,
  })(GestionPedidos);
