import {
    LISTAR_PEDIDOS_USUARIO,
    AGREGAR_PEDIDO_USUARIO,
    CANCELAR_PEDIDO,
    MODIFICAR_PEDIDO,
    LISTAR_PEDIDOS,
    MOSTRAR_MODIFICAR,
    FECHA_FESTIVO,
    ERROR_CONSULTA,
    TiposAccionesPedido,
} from '../../acciones/pedido/PedidosTiposAcciones';
import { EstadoPedido } from '../../modelo/EstadoPedido';
import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';

const initialState: EstadoPedido = {
    pedido: {
        usuario: {nombre: '', clave: ''},
        producto: {nombre: '', detalle: '', precio: 0},
        reunion: {tipo: '', precio: 0},
        fechaRealizacion: '',
        direccion: '',
        horasDeServicio: 0,
        valorTotal: 0,
    },
    pedidos: Array<Pedido>(),
    pedidoListar: {
        id: 0,
        nombreUsuario: '',
        nombreProducto: '',
        tipoReunion: '',
        fechaRealizacion: '',
        direccion: '',
        horasDeServicio: 0,
        valorTotal: 0,
    },
    pedidosListar: Array<PedidoListar>(),
    mensajeConfirmacion: '',
    mensajeExcepcion: '',
    mensajeExitoCancelar: '',
    cantidadTotalPedidos: 0,
    esFestivo: false,
    mostrarModificar: false,
};

export default function (
    state = initialState,
    action: TiposAccionesPedido,
): EstadoPedido {
    switch (action.type) {
        case LISTAR_PEDIDOS_USUARIO: {
            const pedidosListar = action.payload;
            return {
                ...state,
                pedidosListar,
                cantidadTotalPedidos: action.cantidadTotalPedido,
                mensajeExitoCancelar: action.mensajeSinPedidos,
            };
        }
        case AGREGAR_PEDIDO_USUARIO: {
            const pedido = action.payload;
            return { 
                ...state,
                pedidos: [ ...state.pedidos, pedido],
                mensajeConfirmacion: action.mensajeConfirmacion,
                mensajeExitoCancelar: '',
            };
        }
        case CANCELAR_PEDIDO:{
            const pedidoListar = action.payload;
            return { 
                ...state,
                pedidosListar: [
                    ...state.pedidosListar.filter((p) => p.id !== pedidoListar.id),
                ],
                mensajeExitoCancelar: action.mensajeConfirmacion,
                mensajeConfirmacion: '',
                mensajeExcepcion: '',
            };
        }
        case MODIFICAR_PEDIDO: {
            const mensajeConfirmacion = action.mensajeConfirmacion;
            return {
                ...state,
                mensajeConfirmacion,
                mensajeExitoCancelar: '',
                mensajeExcepcion: '',
            };
        }
        case LISTAR_PEDIDOS: {
            return {
                ...state,
                cantidadTotalPedidos: action.numeroPaginas,
            };
        }
        case MOSTRAR_MODIFICAR: {
            const pedidoListar = action.payload;
            return {
                ...state,
                pedidoListar,
                mensajeConfirmacion: '',
                mensajeExcepcion: '',
                mensajeExitoCancelar: '',
            };
        }
        case FECHA_FESTIVO: {
            return {
                ...state,
                esFestivo: action.payload,
                mensajeConfirmacion: '',
                mensajeExcepcion: '',
                mensajeExitoCancelar: '',
            };
        }
        case ERROR_CONSULTA: {
            return {
                ...state,
                mensajeExcepcion: action.mensajeError,
                mensajeConfirmacion: '',
                mensajeExitoCancelar: '',
            };
        }

        default:
            return state;
    }
}
