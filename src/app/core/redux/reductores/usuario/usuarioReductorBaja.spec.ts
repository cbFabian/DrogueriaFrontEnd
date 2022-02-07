import { EstadoUsuario } from 'app/core/redux/modelo/EstadoUsuario';
import { cerrarSesionUsuario } from 'app/core/redux/acciones/usuario/UsuarioAcciones';
import reductorUsuario from './usuarioReductor';

describe('Reductor usuario', () => {
  it('debería actualizar clave de usuario', () => {
    // Arrange
    const estadoInicial: EstadoUsuario = {
        usuarios: [{nombre: 'Prueba1', clave: '1234'}],
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
    const nuevoMensajeDeBaja: string = 'Se ha dado de baja su cuenta';
    const estadoEsperado: EstadoUsuario = {
      ...estadoInicial,
      usuarios: [],
      mostrarPanel: false,
      mostrarAgregar: false,
      mostrarInicio: true,
      mensajeConfirmacion: nuevoMensajeDeBaja,
      mensajeError: '',
    };

    // Act
    const nuevoEstado = reductorUsuario(
      estadoInicial,
      cerrarSesionUsuario(nuevoMensajeDeBaja)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
