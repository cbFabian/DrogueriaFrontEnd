import {
    AGREGAR_REUNION,
    LISTAR_REUNIONES,
    TiposAccionesReunion,
  } from '../../acciones/reunion/ReunionTiposAcciones';
  import { EstadoReunion } from '../../modelo/EstadoReunion';
  import { Reunion } from 'app/feature/Reunion/models/Reunion';
  
const initialState: EstadoReunion = {
  reuniones: Array<Reunion>(),
  cantidadTotalReunion: 0,
};
  
export default function (
  state = initialState,
  action: TiposAccionesReunion,
): EstadoReunion {
  switch (action.type) {
    case LISTAR_REUNIONES: {
      const reuniones = action.payload;
      return {
        ...state,
        reuniones,
        cantidadTotalReunion: action.cantidadTotalReuniones,
      };
    }
    case AGREGAR_REUNION: {
      const reunion = action.payload;
      return {
        ...state,
        reuniones: [...state.reuniones, reunion],
      };
    }

    default:
      return state;
  }
}
