import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { PedidoListar } from 'app/feature/Pedido/models/PedidoListar';
import { Fecha } from 'app/feature/Pedido/models/Fecha';
import { axiosIntance, axiosInstanceCalendar } from '../config/AxiosConfig';

export const PedidoRepositorio = {
    agregarPedido: (
        {usuario, 
        producto, 
        reunion, 
        fechaRealizacion, 
        direccion, 
        valorTotal, 
        horasDeServicio,}: Pedido
        ) =>
        axiosIntance.post('/pedidos', {
            usuario, 
            producto,
            reunion,
            direccion,
            valorTotal,
            horasDeServicio,
            fechaRealizacion,
        }),
    modificarPedido: ({
        id
        }: PedidoListar,
        {
            usuario, 
            producto, 
            reunion, 
            fechaRealizacion, 
            direccion, 
            valorTotal, 
            horasDeServicio,
        }: Pedido
        ) =>
        axiosIntance.patch('/pedidos', {
            id,
            usuario, 
            producto,
            reunion,
            fechaRealizacion,
            direccion,
            valorTotal,
            horasDeServicio,
        }),
    cancelarPedido: ({id}: PedidoListar) =>
        axiosIntance.patch('/pedidos/cancelar', {id}),
    consultarPedidosUsuario: (nombre: string) => 
        axiosIntance.get(`/pedidos?nombre=${nombre}`),
    consultarProductos: () =>
        axiosIntance.get('/productos'),    
    consultarReuniones: () => 
        axiosIntance.get('/reuniones'),
    consultarFestivo: ({country, year, day, month}: Fecha) =>
        axiosInstanceCalendar.get(`/holidays?api_key=${process.env.REACT_APP_API_KEY}&country=${country}&year=${year}&day=${day}&month=${month}`),
};
