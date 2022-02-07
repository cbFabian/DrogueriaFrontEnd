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
} from './PedidosTiposAcciones';
import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { PedidoRepositorio } from 'app/core/api/pedidos.repositorio';
import { Usuario } from 'app/feature/Usuario/models/Usuario';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';
import { Fecha } from 'app/feature/Pedido/models/Fecha';

const COLOMBIA = 'CO';
const UNO = 1;

export function listarPedidosUsuario(
    pedidosListar: Array<PedidoListar>,
    cantidadTotalPedido: number,
): TiposAccionesPedido {
    let mensajeSinPedidos = '';
    if (cantidadTotalPedido === 0){
        mensajeSinPedidos = '¡No tienes Pedidos Pendientes!';
    }
    return {
        type: LISTAR_PEDIDOS_USUARIO,
        payload: pedidosListar,
        cantidadTotalPedido,
        mensajeSinPedidos,
    };
}
  
export function listarPedidosUsuarioAsync(usuario: Usuario)
{
    return function (dispacth: any) {
        PedidoRepositorio.consultarPedidosUsuario(usuario.nombre)
        .then((respuesta: any) =>
            dispacth(
                listarPedidosUsuario(respuesta.data, Array.from(respuesta.data).length)
            )
        );
    };
}

export function agregarPedidoUsuario(
    pedido: Pedido,
    mensajeConfirmacion: string,
): TiposAccionesPedido {
    return {
        type: AGREGAR_PEDIDO_USUARIO,
        payload: pedido,
        mensajeConfirmacion: `Su pedido fue creado`,
    };
}
  
export function agregarPedidoUsuarioAsync(pedido: Pedido)
{
    return function (dispacth: any) {
        PedidoRepositorio.agregarPedido(pedido)
        .then((respuesta: any) =>
            dispacth(
                agregarPedidoUsuario(pedido, respuesta.statusText)
            )
        ).catch((errorAgregarPedido: any) => dispacth(
            errorConsulta(errorAgregarPedido.response.data.message),
          )
        );
    };
}

export function cancelarPedidoUsuario(
    pedidoListar: PedidoListar,
    mensajeConfirmacion: string,
): TiposAccionesPedido {
    return {
        type: CANCELAR_PEDIDO,
        payload: pedidoListar,
        mensajeConfirmacion,
    };
}

export function cancelarPedidoUsuarioAsync(pedidoListar: PedidoListar)
{
    return function (dispacth: any) {
      PedidoRepositorio.cancelarPedido(pedidoListar)
        .then((respuesta: any) =>
            dispacth(
              cancelarPedidoUsuario(pedidoListar, respuesta.data)
            )
        );
    };
}

export function modificarPedidoUsuario(
    mensajeConfirmacion: string,
): TiposAccionesPedido {
    return {
        type: MODIFICAR_PEDIDO,
        mensajeConfirmacion: `Su Pedido ha sido modificado con exito`,
    };
}
  
export function modificarPedidoUsuarioAsync(pedidoListar: PedidoListar, pedido: Pedido) {
    return function (dispacth: any) {
            PedidoRepositorio.modificarPedido(pedidoListar, pedido)
            .then((respuesta: any) =>
            dispacth(
                modificarPedidoUsuario(respuesta.statusText),
            )
        );
    };
}

export function listarPedidos(
    numeroPaginas: number,
): TiposAccionesPedido {
    return {
        type: LISTAR_PEDIDOS,
        numeroPaginas,
    };
}

export function irModificarPedidoUsuario(
    pedidoModificar: PedidoListar,
):TiposAccionesPedido {
    return {
        type: MOSTRAR_MODIFICAR,
        payload: pedidoModificar,
    };
}

export function errorConsulta(
    mensajeError: string,
):TiposAccionesPedido {
    return {
        type: ERROR_CONSULTA,
        mensajeError,
    };
}

export function validarDiaFestivo(
    fechaFestivo: Array<any>,
):TiposAccionesPedido {
    console.log(fechaFestivo);
    let esFestivo: boolean = fechaFestivo.length > 0 ? true : false;
    return {
        type: FECHA_FESTIVO,
        payload: esFestivo,
    };
}

export function validarDiaFestivoAsync(fecha: Date) {
    const fechaFestivo: Fecha = {
        country: COLOMBIA,
        year: new Date(fecha).getFullYear(),
        day: new Date(fecha).getDate(),
        month: new Date(fecha).getMonth() + UNO,
    };
    return function (dispacth: any) {
      PedidoRepositorio.consultarFestivo(
        fechaFestivo
        ).then((respuesta: any) => dispacth(         
            validarDiaFestivo(respuesta.data.response.holidays),
        )
      ).catch((errorAPICalendar: any) => dispacth(
          errorConsulta(errorAPICalendar),
        )
      );
    };
  }
