import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';

export interface EstadoPedido {
    pedido: Pedido;
    pedidos: Pedido[];
    pedidoListar: PedidoListar;
    pedidosListar: PedidoListar[];
    mensajeConfirmacion: string;
    mensajeExcepcion: string;
    mensajeExitoCancelar: string;
    cantidadTotalPedidos: number;
    esFestivo: boolean;
    mostrarModificar: boolean; 
}
