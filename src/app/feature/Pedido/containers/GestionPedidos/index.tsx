import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from './styles';
import { ListarPedidosUsuario } from '../../components/ListarPedidosUsuario';
import { PaginadorPedidos } from '../../components/PaginadorPedidos';
import { Pedido } from '../../models/Pedido';
import { Usuario } from 'app/feature/Usuario/models/Usuario';
import { PedidoListar } from '../../models/PedidoListar';
import { MenuLogueado } from 'app/shared/components/MenuLogueado';
import { EstadoUsuario } from 'app/core/redux/modelo/EstadoUsuario';
import { EstadoPedido } from 'app/core/redux/modelo/EstadoPedido';
import { EstadoProducto } from 'app/core/redux/modelo/EstadoProducto';
import { EstadoReunion } from 'app/core/redux/modelo/EstadoReunion';
import { Link } from 'react-router-dom';

interface GestionPedidosProps {
  usuario: EstadoUsuario;
  pedidos: EstadoPedido;
  productos: EstadoProducto;
  reuniones: EstadoReunion;
  listarPedidosUsuario: (usuario: Usuario) => void;
  cancelarPedidoUsuario: (pedidoListar: PedidoListar) => void;
  modificarPedidoUsuario: (pedidoListar: PedidoListar, pedido: Pedido) => void;
  listarPedidos: (numeroPagina: number) => void;
  validarDiaFestivo: (fechaFestivo: Date) => void;
  irModificarPedidoUsuario: (pedidoListar: PedidoListar) => void;
}

export const GestionPedidos: React.FC<GestionPedidosProps> = ({
  usuario,
  pedidos,
  listarPedidosUsuario,
  cancelarPedidoUsuario,
  listarPedidos,
  validarDiaFestivo,
  irModificarPedidoUsuario,
}) => {
  return (
    <DivContainer>
      {usuario && 
      <MenuLogueado 
        usuario={usuario.usuarios[0]}
      />}
      <DivRow>
      {usuario && !pedidos.mostrarModificar && 
      <ListarPedidosUsuario
          usuario={usuario.usuarios[0]}
          tablaListarTitulo={'Lista de Pedidos Pendientes'}
          listarPedidosUsuario={listarPedidosUsuario}
          onClickCancelarPedido={cancelarPedidoUsuario}
          onClickModificarPedido={irModificarPedidoUsuario}
          pedidosListar={pedidos.pedidosListar}
          mensajeCancelar={pedidos.mensajeExitoCancelar}
        />}
        {usuario && !pedidos.mostrarModificar && 
        <PaginadorPedidos
          cantidadTotalPedidos={pedidos.cantidadTotalPedidos}
          onClickCambiarPagina={listarPedidos}
        />}
        <Link to='/crear-pedido' replace={true}>
                <span role='img' aria-labelledby='modificar'>
                    Ir a Crear Pedido⏩
                </span>
        </Link>
      </DivRow>
    </DivContainer>
  );
};

GestionPedidos.propTypes = {
  usuario: PropTypes.shape({
      usuarios: PropTypes.array.isRequired,
      usuario: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        clave: PropTypes.string.isRequired,
      }).isRequired,
      cambioClaveUsuario: PropTypes.shape({
        nombre: PropTypes.string.isRequired, 
        claveActual: PropTypes.string.isRequired, 
        claveNueva: PropTypes.string.isRequired,
      }).isRequired,
      mensajeError: PropTypes.string.isRequired,
      mensajeConfirmacion: PropTypes.string.isRequired,
      mostrarAgregar: PropTypes.bool.isRequired,
      mostrarInicio: PropTypes.bool.isRequired,
      mostrarPanel: PropTypes.bool.isRequired,
      mostrarActualizar: PropTypes.bool.isRequired,
    }).isRequired,
  pedidos: PropTypes.shape({
    pedido: PropTypes.shape({
      usuario: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        clave: PropTypes.string.isRequired,
      }).isRequired,
      producto: PropTypes.shape({
        nombre: PropTypes.string.isRequired, 
        detalle: PropTypes.string.isRequired, 
        precio: PropTypes.number.isRequired,
      }).isRequired,
      reunion: PropTypes.shape({
        tipo: PropTypes.string.isRequired, 
        precio: PropTypes.number.isRequired,
      }).isRequired,
      fechaRealizacion: PropTypes.string.isRequired,
      direccion: PropTypes.string.isRequired,
      horasDeServicio: PropTypes.number.isRequired,
      valorTotal: PropTypes.number.isRequired,
  }).isRequired,
  pedidos: PropTypes.array.isRequired,
  pedidoListar: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombreUsuario: PropTypes.string.isRequired,
      nombreProducto: PropTypes.string.isRequired,
      tipoReunion: PropTypes.string.isRequired,
      fechaRealizacion: PropTypes.string.isRequired,
      direccion: PropTypes.string.isRequired,
      horasDeServicio: PropTypes.number.isRequired,
      valorTotal: PropTypes.number.isRequired,
  }).isRequired,
    pedidosListar: PropTypes.array.isRequired,
    productos: PropTypes.array.isRequired,
    reuniones: PropTypes.array.isRequired,
    mensajeConfirmacion: PropTypes.string.isRequired,
    mensajeExcepcion: PropTypes.string.isRequired,
    mensajeExitoCancelar: PropTypes.string.isRequired,
    esFestivo: PropTypes.bool.isRequired,
    cantidadTotalPedidos: PropTypes.number.isRequired,
    cantidadTotalProductos: PropTypes.number.isRequired,
    mostrarModificar: PropTypes.bool.isRequired,
  }).isRequired,
  listarPedidosUsuario: PropTypes.func.isRequired,
  cancelarPedidoUsuario: PropTypes.func.isRequired,
  listarPedidos: PropTypes.func.isRequired,
};
