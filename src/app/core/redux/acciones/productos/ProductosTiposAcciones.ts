import { Producto } from 'app/feature/Producto/models/Producto';

export const LISTAR_PRODUCTOS = 'LISTAR_PRODUCTOS';
export const AGREGAR_PRODUCTO = 'AGREGAR_PRODUCTO';

interface AccionListarProductos {
  type: typeof LISTAR_PRODUCTOS;
  payload: Producto[];
  cantidadTotalProducto: number;
}

interface AccionAgregarProducto {
  type: typeof AGREGAR_PRODUCTO;
  payload: Producto;
}

export type TiposAccionesProducto =
  | AccionListarProductos
  | AccionAgregarProducto;
