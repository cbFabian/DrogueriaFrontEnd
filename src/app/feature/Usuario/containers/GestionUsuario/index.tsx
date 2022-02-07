import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow, BotonesUsuarioImg, DivImg, H2Exitoso } from './styles';
import { FormCrearUsuario } from '../../components/FormCrearUsuario';
import { Usuario } from '../../models/Usuario';
import { PaginaIniciarSesion } from '../../components/PaginaIniciarSesion';
import ImgIniciaSesion from 'assets/img/imgIniciaSesion.png';
import ImgRegistrate from 'assets/img/imgRegistrate.png';
import { MenuLogueado } from 'app/shared/components/MenuLogueado';

interface GestionUsuarioProps {
  usuarios: Usuario[];
  mostrarAgregar: boolean;
  mostrarInicio: boolean;
  mensajeConfirmacion: string;
  mensajeError: string;
  agregarNuevoUsuario: (usuario: Usuario) => void;
  agregarSesionUsuario: (usuarios: Usuario) => void;
  irInicioSesion: () => void;
  irAgregarUsuario: () => void;
}

export const GestionUsuario: React.FC<GestionUsuarioProps> = ({
    agregarNuevoUsuario,
    agregarSesionUsuario,
    irInicioSesion,
    irAgregarUsuario,
    usuarios,
    mostrarAgregar,
    mostrarInicio,
    mensajeConfirmacion,
    mensajeError,
}) => {
  return (
    <DivContainer>
      {usuarios.length > 0 && 
      <MenuLogueado
        usuario={usuarios[0]}    
      />}
      <DivRow>
        {mensajeConfirmacion.length > 0 && 
        <H2Exitoso>
            {mensajeConfirmacion}
        </H2Exitoso>}
        <DivImg>
            {mostrarInicio && <BotonesUsuarioImg
            src={ImgRegistrate} 
            onClick={irAgregarUsuario}
            />}
            {mostrarAgregar && <BotonesUsuarioImg
              src={ImgIniciaSesion} 
              onClick={irInicioSesion} 
            />}
        </DivImg>
         {mostrarAgregar && <FormCrearUsuario
          onSubmit={agregarNuevoUsuario}
          formTitle="Crea tu Usuario"
          irInicioSesion={irInicioSesion}
          mensajeErrorCreacion={mensajeError}
        />}
        {mostrarInicio && <PaginaIniciarSesion 
          onSubmit={agregarSesionUsuario}
          paginaTitle="Inicia de Sesión"
          mensajeErrorSesion={mensajeError}
        />}
      </DivRow>
    </DivContainer>
  );
};

GestionUsuario.propTypes = {
  mostrarAgregar: PropTypes.bool.isRequired,
  mostrarInicio: PropTypes.bool.isRequired,
  mensajeConfirmacion: PropTypes.string.isRequired,
  mensajeError: PropTypes.string.isRequired,
  agregarNuevoUsuario: PropTypes.func.isRequired,
  agregarSesionUsuario: PropTypes.func.isRequired,
};
