import { Producto } from 'app/feature/Producto/models/Producto';
import { axiosIntance } from '../config/AxiosConfig';

export const ProductoRepositorio = {
  consultarPorPagina: () =>
    axiosIntance.get('/productos'),
  crearProducto: ({nombre, precio, detalle}: Producto) =>
    axiosIntance.post('/productos', { nombre, detalle, precio}),
};
