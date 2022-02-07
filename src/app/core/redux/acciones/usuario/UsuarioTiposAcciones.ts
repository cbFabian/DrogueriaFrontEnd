import { Usuario } from 'app/feature/Usuario/models/Usuario';

export const CERRAR_SESION_USUARIO = 'CERRAR_SESION_USUARIO';
export const SESION_USUARIO = 'SESION_USUARIO';
export const USUARIO_CREADO = 'USUARIO_CREADO';
export const ERROR_CONSULTA = 'ERROR_CONSULTA';
export const MOSTRAR_INICIO = 'MOSTRAR_INICIO';
export const MOSTRAR_AGREGAR = 'MOSTRAR_AGREGAR';
export const BORRAR_MENSAJES = 'BORRAR_MENSAJES';

interface AccionCerrarSesionUsuario {
  type: typeof CERRAR_SESION_USUARIO;
  payload: string;
}

interface AccionIniciarSesionUsuario {
  type: typeof SESION_USUARIO;
  payload: Usuario;
  mensaje: string;
}

interface AccionCrearUsuario {
    type: typeof USUARIO_CREADO;
    payload: string;
}

interface AccionErrorConsultaUsuario {
  type: typeof ERROR_CONSULTA;
  payload: string;
}

interface AccionMostarInicio {
  type: typeof MOSTRAR_INICIO;
  payload: boolean;
}

interface AccionCrearAgregar {
  type: typeof MOSTRAR_AGREGAR;
  payload: boolean;
}

interface AccionBorrarMensajes {
  type: typeof BORRAR_MENSAJES;
  payload: string;
}

export type TiposAccionesUsuario =
  | AccionCerrarSesionUsuario
  | AccionIniciarSesionUsuario
  | AccionCrearUsuario
  | AccionMostarInicio
  | AccionCrearAgregar
  | AccionErrorConsultaUsuario
  | AccionBorrarMensajes;
