import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from './styles';
import { FormCrearReunion } from '../../components/FormCrearReunion';
import { ListaReuniones } from '../../components/ListaReuniones';
import { PaginadorReunion } from '../../components/PaginadorReunion';
import { Reunion } from '../../models/Reunion';
import { useEffect } from 'react';
import { EstadoReunion } from 'app/core/redux/modelo/EstadoReunion';
import { EstadoUsuario } from 'app/core/redux/modelo/EstadoUsuario';
import { MenuLogueado } from 'app/shared/components/MenuLogueado';

interface GestionReunionesProps {
  reuniones: EstadoReunion;
  usuario: EstadoUsuario;
  listarReuniones: (numeroPagina: number) => void;
  agregarNuevaReunion: (reunion: Reunion) => void;
}

export const GestionReuniones: React.FC<GestionReunionesProps> = ({
  listarReuniones,
  agregarNuevaReunion,
  reuniones,
  usuario,
}) => {
  useEffect(() => {
    listarReuniones(0);
  }, [listarReuniones]);
  const estaLogueado: boolean = usuario.usuarios.length > 0 ? true : false;
  return (
    <DivContainer>
      {estaLogueado && 
      <MenuLogueado
        usuario={usuario.usuarios[0]}    
      />}
      <DivRow>
      {!estaLogueado &&<FormCrearReunion
          onSubmit={agregarNuevaReunion}
          formTitle="Crear Reunion"
        />}
        <ListaReuniones
          reuniones={reuniones.reuniones}
        />
        <PaginadorReunion
          cantidadTotalReuniones={reuniones.cantidadTotalReunion} 
          onClickCambiarPagina={listarReuniones}
        />
      </DivRow>
    </DivContainer>
  );
};

GestionReuniones.propTypes = {
  reuniones: PropTypes.shape({
    reuniones: PropTypes.array.isRequired,
    cantidadTotalReunion: PropTypes.number.isRequired,
  }).isRequired,
  usuario: PropTypes.shape({
    usuarios: PropTypes.array.isRequired,
    usuario: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      clave: PropTypes.string.isRequired,
    }).isRequired,
    cambioClaveUsuario: PropTypes.shape({
      nombre: PropTypes.string.isRequired, 
      claveActual: PropTypes.string.isRequired, 
      claveNueva: PropTypes.string.isRequired,
    }).isRequired,
    mensajeError: PropTypes.string.isRequired,
    mensajeConfirmacion: PropTypes.string.isRequired,
    mostrarAgregar: PropTypes.bool.isRequired,
    mostrarInicio: PropTypes.bool.isRequired,
    mostrarPanel: PropTypes.bool.isRequired,
    mostrarActualizar: PropTypes.bool.isRequired,
  }).isRequired,
  listarReuniones: PropTypes.func.isRequired,
  agregarNuevaReunion: PropTypes.func.isRequired,
};
