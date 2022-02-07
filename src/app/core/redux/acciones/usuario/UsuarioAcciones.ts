import {
  CERRAR_SESION_USUARIO,
  SESION_USUARIO,
  USUARIO_CREADO,
  ERROR_CONSULTA,
  MOSTRAR_AGREGAR,
  MOSTRAR_INICIO,
  BORRAR_MENSAJES,
  TiposAccionesUsuario,
} from './UsuarioTiposAcciones';
import { Usuario } from 'app/feature/Usuario/models/Usuario';
import { UsuarioRepositorio } from 'app/core/api/usuario.repositorio';
import { CambioClaveUsuario } from 'app/feature/Usuario/models/CambioClaveUsuario';
  
export function cerrarSesionUsuario(
  mensaje: string
): TiposAccionesUsuario {
  return {
    type: CERRAR_SESION_USUARIO,
    payload: mensaje,
  };
}

export function actualizarClave(cambioClaveUsuario: CambioClaveUsuario) {
  const mensajeActualizacion = 'Se ha Actualizado su Clave, Inicie Sesión';
  return function (dispacth: any) {
    UsuarioRepositorio.actualizar(
      cambioClaveUsuario
    ).then(() =>
      dispacth(
        cerrarSesionUsuario(mensajeActualizacion)
      )
    ).catch((errorClave: any) =>
      dispacth(
        errorEnConsulta(errorClave.response.data.message),
      )
    );
  };
}

export function darDeBajaUsuario(usuario: Usuario) {
  const mensajeRetiro = 'Se ha dado de baja su cuenta';
  return function (dispacth: any) {
    UsuarioRepositorio.darDeBaja(
        usuario.nombre
      ).then(() =>
      dispacth(
          cerrarSesionUsuario(mensajeRetiro),
      )
    ).catch((errorRetiro: any) => dispacth(
        errorEnConsulta(errorRetiro.response.data.message),
      )
    );
  };
}
  
export function agregarSesionUsuario(
  usuario: Usuario,
): TiposAccionesUsuario {
  return {
    type: SESION_USUARIO,
    payload: usuario,
    mensaje: `Bienvenid@ ${usuario.nombre}, inicio de Sesión correcto!!`,
  };
}

export function iniciarSesionUsuarioAsync(usuario: Usuario) {
  return function (dispacth: any) {
    UsuarioRepositorio.iniciarSesion(
      usuario
      ).then((respuesta: any) =>
        dispacth(
          agregarSesionUsuario(respuesta.data),
        )
      ).catch ((errorSesion: any) => dispacth(
          errorEnConsulta(errorSesion.response.data.message),
        )
      );
  };
}

export function agregarUsuario(
  confirmacion: string
): TiposAccionesUsuario {
  return {
    type: USUARIO_CREADO,
    payload: `¡Su cuenta ha sido creada!`,
  };
}

export function agregarNuevoUsuario(usuario: Usuario) {
  return function (dispacth: any) {
    UsuarioRepositorio.agregarUsuario(
        usuario
      ).then((respuesta: any) => dispacth(         
          agregarUsuario(respuesta.statusText),
      )
    ).catch((errorAgregar: any) => dispacth(
        errorEnConsulta(errorAgregar.response.data.message),
      )
    );
  };
}

export function errorEnConsulta(
    error: string
  ): TiposAccionesUsuario {
    return {
      type: ERROR_CONSULTA,
      payload: error,
    };
  }


export function irAgregarUsuario(
):TiposAccionesUsuario {
  return {
    type: MOSTRAR_AGREGAR,
    payload: true,
  };
}

export function irInicioSesion(
  ):TiposAccionesUsuario {
  return {
    type: MOSTRAR_INICIO,
    payload: true,
  };
}

export function borrarMensajes(
  ):TiposAccionesUsuario {
  return {
    type: BORRAR_MENSAJES,
    payload: '',
  };
}
