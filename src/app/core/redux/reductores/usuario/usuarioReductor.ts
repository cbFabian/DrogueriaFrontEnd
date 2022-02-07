import {
  CERRAR_SESION_USUARIO,
  SESION_USUARIO,
  ERROR_CONSULTA,
  MOSTRAR_AGREGAR,
  MOSTRAR_INICIO,
  USUARIO_CREADO,
  BORRAR_MENSAJES,
  TiposAccionesUsuario,
} from '../../acciones/usuario/UsuarioTiposAcciones';
import { EstadoUsuario } from '../../modelo/EstadoUsuario';
import { Usuario } from 'app/feature/Usuario/models/Usuario';

const initialState: EstadoUsuario = {
  usuarios: Array<Usuario>(),
  usuario: {nombre: '', clave: ''},
  cambioClaveUsuario: {
    nombre: '', 
    claveActual: '', 
    claveNueva: '',
  },
  mensajeError: '',
  mensajeConfirmacion: '',
  mostrarAgregar: false,
  mostrarInicio: true,
  mostrarPanel: false,
  mostrarActualizar: false,
};

export default function (
  state = initialState,
  action: TiposAccionesUsuario,
): EstadoUsuario {
  switch (action.type) {
    case CERRAR_SESION_USUARIO: {
      return {
        ...state,
        usuarios: [],
        mostrarPanel: false,
        mostrarAgregar: false,
        mostrarInicio: true,
        mensajeConfirmacion: action.payload,
        mensajeError: '',
      };
    }
    case SESION_USUARIO: {
      const usuario = action.payload;
      return {
        ...state,
        usuarios: [...state.usuarios, usuario],
        mostrarPanel: true,
        mostrarAgregar: false,
        mostrarInicio: false,
        mensajeConfirmacion: action.mensaje,
        mensajeError: '',
      };
    }
    case USUARIO_CREADO: {
      const confirmacion: string = action.payload;
      return {
        ...state,
        mensajeConfirmacion: confirmacion,
        mensajeError: '',
        mostrarPanel: false,
        mostrarAgregar: false,
        mostrarInicio: true,
      };
    }    
    case ERROR_CONSULTA: {
      const error: string = action.payload;
      return {
        ...state,
        mensajeError: error,
        mensajeConfirmacion: '',
      };
    }
    case MOSTRAR_AGREGAR: {
      return {
        ...state,
        mostrarAgregar: action.payload,
        mostrarInicio: false,
        mostrarPanel: false,
        mensajeError: '',
        mensajeConfirmacion: '',
      };
    }
    case MOSTRAR_INICIO: {
      return {
        ...state,
        mostrarInicio: action.payload,
        mostrarAgregar: false,
        mostrarPanel: false,
        mensajeError: '',
      };
    }
    case BORRAR_MENSAJES: {
      return {
        ...state,
        mensajeError: action.payload,
        mensajeConfirmacion: action.payload,
      };
    }
    
    default:
      return state;
  }
}
