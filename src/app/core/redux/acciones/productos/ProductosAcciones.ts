import {
  AGREGAR_PRODUCTO,
  LISTAR_PRODUCTOS,
  TiposAccionesProducto,
} from './ProductosTiposAcciones';
import { Producto } from 'app/feature/Producto/models/Producto';
import { ProductoRepositorio } from 'app/core/api/productos.repositorio';

export function listarProductos(
  productos: Array<Producto>,
  cantidadTotalProducto: number,
): TiposAccionesProducto {
  productos.unshift({nombre: 'Ingrese el Producto', detalle: '', precio: 0});
  return {
    type: LISTAR_PRODUCTOS,
    payload: productos,
    cantidadTotalProducto,
  };
}

export function agregarNuevoProducto(producto: Producto) {
    return function (dispacth: any) {
      ProductoRepositorio.crearProducto(
        producto
      ).then((respuesta: any) =>
        dispacth(
          agregarProducto(respuesta.data)
        )
      );
    };
}

export function agregarProducto(
  producto: Producto
): TiposAccionesProducto {
  return {
    type: AGREGAR_PRODUCTO,
    payload: producto,
  };
}

export function listarProductosAsync(numeroPagina: number) {
  return function (dispacth: any) {
    ProductoRepositorio.consultarPorPagina()
    .then((respuesta: any) =>
      dispacth(
        listarProductos(respuesta.data, Array.from(respuesta.data).length)
      )
    );
  };
}
