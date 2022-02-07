import {
    AGREGAR_REUNION,
    LISTAR_REUNIONES,
    TiposAccionesReunion,
  } from './ReunionTiposAcciones';
import { Reunion } from 'app/feature/Reunion/models/Reunion';
import { ReunionRepositorio } from 'app/core/api/reunion.repositorio';
  
export function listarReuniones(
  reuniones: Array<Reunion>,
  cantidadTotalReuniones: number,
): TiposAccionesReunion {
  reuniones.unshift({tipo: 'Ingrese el Tipo de Reunión', precio: 0});
  return {
    type: LISTAR_REUNIONES,
    payload: reuniones,
    cantidadTotalReuniones,
  };
}
  
export function respuestaAgregado(
  reunion: Reunion
): TiposAccionesReunion {
  return {
    type: AGREGAR_REUNION,
    payload: reunion,
  };
}

export function agregarNuevaReunion( reunion: Reunion ) {
  return function (dispacth: any) {
    ReunionRepositorio.crearReunion(
      reunion
    ).then((respuesta: any) =>
      dispacth(
        respuestaAgregado(respuesta.data)
      )
    );
  };
}
    
export function listarReunionesAsync(numeroPagina: number) {
  return function (dispacth: any) {
    ReunionRepositorio.consultarPorPagina()
    .then((respuesta: any) =>
      dispacth(
        listarReuniones(respuesta.data, Array.from(respuesta.data).length),
      )
    );
  };
}
 
