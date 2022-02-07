import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow, BotonesUsuarioImg, DivImg, H2Exitoso } from './styles';
import { Usuario } from '../../models/Usuario';
import { CambioClaveUsuario } from '../../models/CambioClaveUsuario';
import ImgSalidaSegura from 'assets/img/imgSalidaSegura.png';
import ImgDarDeBaja from 'assets/img/imgDarDeBaja.png';
import { Link } from 'react-router-dom';
import { FormActualizarContrasena } from '../../components/FormActualizarContrasena';
import { MenuLogueado } from '../../../../shared/components/MenuLogueado';
import { useEffect } from 'react';

const CIERRE_SESION = 'Se ha cerrado sesión correctamente';
interface AjustesUsuarioProps {
  usuarios: Usuario[];
  mensajeError: string;
  mensajeConfirmacion: string;
  actualizarClave: (cambioClaveUsuario: CambioClaveUsuario) => void;
  darDeBajaUsuario: (usuario: Usuario) => void;
  cerrarSesionUsuario: (mensajeCerrarSesion: string) => void;
  borrarMensajes: () => void;
}

export const AjustesUsuario: React.FC<AjustesUsuarioProps> = ({
    actualizarClave,
    darDeBajaUsuario,
    cerrarSesionUsuario,
    borrarMensajes,
    usuarios,
    mensajeError,
    mensajeConfirmacion,
}) => {
  useEffect(() => {
    borrarMensajes();
  },[borrarMensajes]);
  const handleDarDeBaja = () => darDeBajaUsuario(usuarios[0]);
  const handleCerrarSesion = () => cerrarSesionUsuario(CIERRE_SESION);
  return (
    <DivContainer>
      {usuarios.length > 0 && 
      <MenuLogueado
        usuario={usuarios[0]}    
      />}
      <DivRow>
        <DivImg>
          {usuarios.length > 0 && 
          <Link to='/usuario' replace={true}>
            <BotonesUsuarioImg 
              src={ImgSalidaSegura} 
              onClick={handleCerrarSesion}
            />
          </Link>}
          {usuarios.length > 0 && 
          <Link to='/' replace={true}>
            <BotonesUsuarioImg 
              src={ImgDarDeBaja} 
              onClick={handleDarDeBaja}
             />
          </Link>}
        </DivImg>
        {mensajeConfirmacion.length > 0 && 
            <H2Exitoso>
                {mensajeConfirmacion}
            </H2Exitoso>}
        {usuarios.length > 0 &&
        <FormActualizarContrasena
          onSubmit={actualizarClave}
          borrarMensajeError={borrarMensajes}
          formTitle="Actualiza tu Clave"
          mensajeError={mensajeError}
          usuario={usuarios[0]}
        />}
      </DivRow>
    </DivContainer>
  );
};

AjustesUsuario.propTypes = {
  usuarios: PropTypes.array.isRequired,
  actualizarClave: PropTypes.func.isRequired,
  darDeBajaUsuario: PropTypes.func.isRequired,
  borrarMensajes: PropTypes.func.isRequired,
};
