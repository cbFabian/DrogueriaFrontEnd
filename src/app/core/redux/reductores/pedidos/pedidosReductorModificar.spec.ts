import { EstadoPedido } from 'app/core/redux/modelo/EstadoPedido';
import { modificarPedidoUsuario } from 'app/core/redux/acciones/pedido/PedidosAcciones';
import reductorPedidos from './pedidosReductor';

describe('Reductor pedidos', () => {
  it('debería Modificar pedidos', () => {
    // Arrange
    const estadoInicial: EstadoPedido = {
      pedido: {
        usuario: {nombre: '', clave: ''},
        producto: {nombre: '', detalle: '', precio: 0},
        reunion: {tipo: '', precio: 0},
        fechaRealizacion: '',
        direccion: '',
        horasDeServicio: 0,
        valorTotal: 0,
      },
      pedidoListar: {
        id: 1,
        nombreUsuario: 'Prueba1',
        nombreProducto: 'Sancocho en Leña',
        tipoReunion: 'TIPO_GRANDE',
        fechaRealizacion: '2022-01-04T02:39:47',
        direccion: 'calle 15 #25-35',
        horasDeServicio: 5,
        valorTotal: 150000,
      },
      pedidosListar: [],
      pedidos: [],

      mensajeConfirmacion: '',
      mensajeExcepcion: '',
      mensajeExitoCancelar: '',
      cantidadTotalPedidos: 0,
      esFestivo: false,
      mostrarModificar: false,
    };
    const nuevoMensajeModificacion: string = 'OK';
    const estadoEsperado: EstadoPedido = {
      ...estadoInicial,
      mensajeConfirmacion: 'Su Pedido ha sido modificado con exito',
      mensajeExitoCancelar: '',
      mensajeExcepcion: '',
    };

    // Act
    const nuevoEstado = reductorPedidos(
      estadoInicial,
      modificarPedidoUsuario(nuevoMensajeModificacion)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
