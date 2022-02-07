import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';
export const LISTAR_PEDIDOS_USUARIO = 'LISTAR_PEDIDOS_USUARIO';
export const AGREGAR_PEDIDO_USUARIO = 'AGREGAR_PEDIDO_USUARIO';
export const CANCELAR_PEDIDO = 'CANCELAR_PEDIDO';
export const MODIFICAR_PEDIDO = 'MODIFICAR_PEDIDO';
export const LISTAR_PEDIDOS = 'LISTAR_PEDIDOS';
export const MOSTRAR_MODIFICAR = 'MOSTRAR_MODIFICAR';
export const FECHA_FESTIVO = 'FECHA_FESTIVO';
export const ERROR_CONSULTA = 'ERROR_CONSULTA';

interface AccionListarPedidosUsuario {
    type: typeof LISTAR_PEDIDOS_USUARIO;
    payload: PedidoListar[];
    cantidadTotalPedido: number;
    mensajeSinPedidos: string;
}

interface AccionAgregarPedidoUsuario {
    type: typeof AGREGAR_PEDIDO_USUARIO;
    payload: Pedido;
    mensajeConfirmacion: string;
}

interface AccionCancelarPedido {
    type: typeof CANCELAR_PEDIDO;
    payload: PedidoListar;
    mensajeConfirmacion: string;
}

interface AccionModificarPedido {
    type: typeof MODIFICAR_PEDIDO;
    mensajeConfirmacion: string;
}

interface AccionListarPedidos {
    type: typeof LISTAR_PEDIDOS;
    numeroPaginas: number;
}

interface AccionMostrarModificar {
    type: typeof MOSTRAR_MODIFICAR;
    payload: PedidoListar;
}

interface AccionEsFestivo {
    type: typeof FECHA_FESTIVO;
    payload: boolean;
}

interface AccionErrorConsulta {
    type: typeof ERROR_CONSULTA;
    mensajeError: string;
}

export type TiposAccionesPedido =
  | AccionListarPedidosUsuario
  | AccionAgregarPedidoUsuario
  | AccionCancelarPedido
  | AccionModificarPedido
  | AccionListarPedidos
  | AccionMostrarModificar
  | AccionEsFestivo
  | AccionErrorConsulta;
