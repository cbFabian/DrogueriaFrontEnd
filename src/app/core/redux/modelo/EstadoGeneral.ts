import { EstadoProducto } from './EstadoProducto';
import { EstadoReunion } from './EstadoReunion';
import { EstadoUsuario } from './EstadoUsuario';
import { EstadoPedido } from './EstadoPedido';

export interface EstadoGeneral {
  productos: EstadoProducto;
  reuniones: EstadoReunion;
  usuario: EstadoUsuario;
  pedidos: EstadoPedido;
}
