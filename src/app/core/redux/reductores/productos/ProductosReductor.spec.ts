import { EstadoProducto } from 'app/core/redux/modelo/EstadoProducto';
import { Producto } from 'app/feature/Producto/models/Producto';
import { agregarProducto, listarProductos } from 'app/core/redux/acciones/productos/ProductosAcciones';
import reductorProductos from './productosReductor';

describe('Reductor productos', () => {
  it('debería agregar productos', () => {
    // Arrange
    const estadoInicial: EstadoProducto = {
      cantidadTotalProducto: 2,
      productos: [],
    };
    const nuevoProducto: Producto = {
      nombre: 'Bandeja Paisa',
      precio: 45000,
      detalle: 'Lorem Ipsum is simply dummy text of the printing and',
    };
    const estadoEsperado: EstadoProducto = {
      ...estadoInicial,
      productos: [nuevoProducto],
    };

    // Act
    const nuevoEstado = reductorProductos(
      estadoInicial,
      agregarProducto(nuevoProducto)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });

  it('debería listar los productos', () => {
    // Arrange
    const estadoInicial: EstadoProducto = {
      cantidadTotalProducto: 2,
      productos: [],
    };
    const listaProductos: Producto[] = [{
        nombre: 'Bandeja Paisa',
        precio: 45000,
        detalle: 'Lorem Ipsum is simply dummy text of the printing and',
      },
      {
        nombre: 'Tallarines al Pesto',
        precio: 27000,
        detalle: 'Lorem Ipsum is simply dummy text of the printing and',
      },
    ];
    const estadoEsperado: EstadoProducto = {
      ...estadoInicial,
      productos: listaProductos,
      cantidadTotalProducto: 2,
    };

    // Act
    const nuevoEstado = reductorProductos(
      estadoInicial,
      listarProductos(listaProductos, 2)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
