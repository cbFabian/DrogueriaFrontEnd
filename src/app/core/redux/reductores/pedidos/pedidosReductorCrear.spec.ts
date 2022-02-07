import { EstadoPedido } from 'app/core/redux/modelo/EstadoPedido';
import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { agregarPedidoUsuario } from 'app/core/redux/acciones/pedido/PedidosAcciones';
import reductorPedidos from './pedidosReductor';

describe('Reductor pedidos', () => {
  it('debería agregar pedidos', () => {
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
    const nuevoPedido: Pedido = {
      usuario: {nombre: 'Lorem', clave: '1234'},
      producto: {
        nombre: 'Paella Española',
        precio: 38000,
        detalle: 'Verduras y sustituye la carne por diversos mariscos, moluscos y pescados'
      },
      reunion: {
        tipo: 'TIPO_PEQUENA',
        precio: 25000
      },
      fechaRealizacion: '2021-12-28T16:00:00.194Z',
      direccion: 'Carrera 80 # 50-32',
      horasDeServicio: 6,
      valorTotal: 67000,
    };
    const estadoEsperado: EstadoPedido = {
      ...estadoInicial,
      pedidos: [nuevoPedido],
      mensajeConfirmacion: 'Su pedido fue creado',
    };

    // Act
    const nuevoEstado = reductorPedidos(
      estadoInicial,
      agregarPedidoUsuario(nuevoPedido, 'Created')
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
