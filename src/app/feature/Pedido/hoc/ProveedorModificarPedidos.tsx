import {
    modificarPedidoUsuarioAsync,
    validarDiaFestivoAsync,
    irModificarPedidoUsuario,
  } from 'app/core/redux/acciones/pedido/PedidosAcciones';
  import { listarProductosAsync } from 'app/core/redux/acciones/productos/ProductosAcciones';
  import { listarReunionesAsync } from 'app/core/redux/acciones/reunion/ReunionAcciones';
  import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
  import { ModificarPedidos } from '../containers/ModificarPedidos';
  import { connect } from 'react-redux';
  
  const mapStateToProps = ({pedidos, usuario, productos, reuniones}: EstadoGeneral) => {
    return {pedidos, usuario, productos, reuniones};
  };
  
  export const ProveedorModificarPedidos = connect(mapStateToProps, {
    modificarPedidoUsuario: modificarPedidoUsuarioAsync,
    listarProductos: listarProductosAsync,
    listarReuniones: listarReunionesAsync,
    validarDiaFestivo: validarDiaFestivoAsync,
    irModificarPedidoUsuario,
  })(ModificarPedidos);
