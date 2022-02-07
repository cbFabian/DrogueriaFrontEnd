import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Usuario } from '../../../Usuario/models/Usuario';
import { BtnCancelarPedidoUsuario } from '../CancelarPedidoUsuario';
import { Table } from './styles';
import { useEffect } from 'react';
import { BtnModificarPedidoUsuario } from '../ModificarPedidoUsuario';
import { MostrarMensaje } from '../MostrarMensaje';

const fechaYHora = (fechaRealizacion: string) => {
  if(fechaRealizacion.length === 0) {
    return 'Fecha no encontrada';
  }
  return new Date(fechaRealizacion).toLocaleString('es-CO', { hour12: true});
};

export interface ListarPedidosUsuarioProps {
  pedidosListar: Array<PedidoListar>;
  usuario: Usuario;
  tablaListarTitulo: string;
  mensajeCancelar: string;
  onClickModificarPedido: (pedidoListar: PedidoListar) => void;
  onClickCancelarPedido: (pedidoListar: PedidoListar) => void;
  listarPedidosUsuario: (usuario: Usuario) => void;
}

export const ListarPedidosUsuario: React.FC<ListarPedidosUsuarioProps> = ({
  pedidosListar,
  usuario,
  tablaListarTitulo,
  mensajeCancelar,
  onClickModificarPedido,
  onClickCancelarPedido,
  listarPedidosUsuario,
}) => {
  useEffect(() => {
    listarPedidosUsuario(usuario);
  },[listarPedidosUsuario, usuario]);
  return (
    <div>
      <h2>
        {tablaListarTitulo}
      </h2>
      <MostrarMensaje 
        mensaje={mensajeCancelar}
      />
    <Table>
      <thead>
        <tr>
          <td>
            <b>Producto</b>
          </td>
          <td>
            <b>Tipo de reunión</b>
          </td>
          <td>
            <b>Fecha y hora de Realización</b>
          </td>
          <td>
            <b>Dirección</b>
          </td>
          <td>
            <b>Numero de Horas de servicio</b>
          </td>
          <td>
            <b>Valor Total</b>
          </td>
          <td>
            <b>Cancelar</b>
          </td>
          <td>
            <b>Modificar</b>
          </td>
        </tr>
      </thead>
      <tbody>
      {pedidosListar.map((pedidoListar: PedidoListar, index) => {
          return (
            <tr key={pedidoListar.id}>
              <td>{`${pedidoListar.nombreProducto} `}</td>
              <td>{`${pedidoListar.tipoReunion} `}</td>
              <td>{`${fechaYHora(pedidoListar.fechaRealizacion)}`}</td>
              <td>{`${pedidoListar.direccion} `}</td>
              <td>{`${pedidoListar.horasDeServicio} `}</td>
              <td>${`${pedidoListar.valorTotal} `}</td>
              <td>
                <BtnModificarPedidoUsuario
                  pedidoListar={pedidoListar}
                  onModificar={onClickModificarPedido} 
                ></BtnModificarPedidoUsuario>
              </td>
              <td>
                <BtnCancelarPedidoUsuario
                  pedidoListar={pedidoListar}
                  onCancelar={onClickCancelarPedido} 
                ></BtnCancelarPedidoUsuario>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    </div>
  );
};

ListarPedidosUsuario.propTypes = {
  pedidosListar: PropTypes.array.isRequired,
  usuario: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    clave: PropTypes.string.isRequired,
  }).isRequired,
};
