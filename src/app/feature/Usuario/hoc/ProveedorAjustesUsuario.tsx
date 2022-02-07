import{
    actualizarClave,
    darDeBajaUsuario,
    cerrarSesionUsuario,
    borrarMensajes,
} from 'app/core/redux/acciones/usuario/UsuarioAcciones';
import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
import { AjustesUsuario } from '../containers/AjustesUsuario';
import { connect } from 'react-redux';

const mapStateToProps = (state: EstadoGeneral) => {
    return state.usuario;
};

export const ProveedorAjustesUsuario = connect(mapStateToProps, {
    actualizarClave,
    darDeBajaUsuario,
    cerrarSesionUsuario,
    borrarMensajes,
})(AjustesUsuario);
