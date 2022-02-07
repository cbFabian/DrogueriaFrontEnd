import { Producto } from 'app/feature/Producto/models/Producto';
import { Reunion } from 'app/feature/Reunion/models/Reunion';
import { Usuario } from 'app/feature/Usuario/models/Usuario';

export interface Pedido {
    usuario: Usuario;
    producto: Producto;
    reunion: Reunion;
    fechaRealizacion: string;
    direccion: string;
    horasDeServicio: number;
    valorTotal: number;
}
