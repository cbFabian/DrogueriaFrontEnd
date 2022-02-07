import { Reunion } from 'app/feature/Reunion/models/Reunion';

export const LISTAR_REUNIONES = 'LISTAR_REUNIONES';
export const AGREGAR_REUNION = 'AGREGAR_REUNION';

interface AccionListarReuniones {
  type: typeof LISTAR_REUNIONES;
  payload: Reunion[];
  cantidadTotalReuniones: number;
}

interface AccionAgregarReunion {
  type: typeof AGREGAR_REUNION;
  payload: Reunion;
}

export type TiposAccionesReunion =
  | AccionListarReuniones
  | AccionAgregarReunion;
