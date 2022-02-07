import { combineReducers } from 'redux';
import productos from './productos/productosReductor';
import reuniones from './reuniones/reunionesReductor';
import usuario from './usuario/usuarioReductor';
import pedidos from './pedidos/pedidosReductor';

export default combineReducers({ productos, reuniones, usuario, pedidos });
