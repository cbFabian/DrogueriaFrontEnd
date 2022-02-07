import { CambioClaveUsuario } from 'app/feature/Usuario/models/CambioClaveUsuario';
import { Usuario } from 'app/feature/Usuario/models/Usuario';

export interface EstadoUsuario {
  usuarios: Usuario[];
  usuario: Usuario;
  cambioClaveUsuario: CambioClaveUsuario;
  mensajeError: string;
  mensajeConfirmacion: string;
  mostrarAgregar: boolean;
  mostrarInicio: boolean;
  mostrarPanel: boolean;
  mostrarActualizar: boolean;
}
