import { EstadoPedido } from 'app/core/redux/modelo/EstadoPedido';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';
import { listarPedidosUsuario } from 'app/core/redux/acciones/pedido/PedidosAcciones';
import reductorPedidos from './pedidosReductor';

describe('Reductor pedidos', () => {
  it('debería Listar pedidos', () => {
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
        id: 0,
        nombreUsuario: '',
        nombreProducto: '',
        tipoReunion: '',
        fechaRealizacion: '',
        direccion: '',
        horasDeServicio: 0,
        valorTotal: 0,
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
    const nuevoPedidosListar: PedidoListar[] = [
      {
        id: 1,
        nombreUsuario: 'Prueba1',
        nombreProducto: 'Sancocho en Leña',
        tipoReunion: 'TIPO_GRANDE',
        fechaRealizacion: '2022-01-04T02:39:47',
        direccion: 'calle 15 #25-35',
        horasDeServicio: 5,
        valorTotal: 150000,
      },
      {
        id: 2,
        nombreUsuario: 'Prueba2',
        nombreProducto: 'Asado al Carbón',
        tipoReunion: 'TIPO_PEQUEÑA',
        fechaRealizacion: '2022-01-04T02:39:47',
        direccion: 'calle 10 #20-30',
        horasDeServicio: 5,
        valorTotal: 170000,
      }
    ];
    const estadoEsperado: EstadoPedido = {
      ...estadoInicial,
      pedidosListar: nuevoPedidosListar,
      cantidadTotalPedidos: 2,
      mensajeExitoCancelar: '',
    };

    // Act
    const nuevoEstado = reductorPedidos(
      estadoInicial,
      listarPedidosUsuario(nuevoPedidosListar, 2)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
