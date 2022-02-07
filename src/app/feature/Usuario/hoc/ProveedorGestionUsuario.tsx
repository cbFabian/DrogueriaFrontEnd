import{
    agregarNuevoUsuario,
    iniciarSesionUsuarioAsync,
    irAgregarUsuario,
    irInicioSesion,
    borrarMensajes,
} from 'app/core/redux/acciones/usuario/UsuarioAcciones';
import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
import { GestionUsuario } from '../containers/GestionUsuario';
import { connect } from 'react-redux';

const mapStateToProps = (state: EstadoGeneral) => {
    return state.usuario;
};

export const ProveedorGestionUsuario = connect(mapStateToProps, {
    agregarSesionUsuario: iniciarSesionUsuarioAsync,
    agregarNuevoUsuario,
    irAgregarUsuario,
    irInicioSesion,
    borrarMensajes,
})(GestionUsuario);
