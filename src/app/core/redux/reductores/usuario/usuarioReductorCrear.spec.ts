import { EstadoUsuario } from 'app/core/redux/modelo/EstadoUsuario';
import { agregarUsuario } from 'app/core/redux/acciones/usuario/UsuarioAcciones';
import reductorUsuario from './usuarioReductor';

describe('Reductor usuario', () => {
  it('debería mostrar mensaje de usuario creado', () => {
    // Arrange
    const estadoInicial: EstadoUsuario = {
        usuarios: [],
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
    const nuevoMensajeConfirmacion: string = 'Created'; 
    const estadoEsperado: EstadoUsuario = {
      ...estadoInicial,
      mensajeConfirmacion: '¡Su cuenta ha sido creada!',
      mensajeError: '',
      mostrarPanel: false,
      mostrarAgregar: false,
      mostrarInicio: true,
    };

    // Act
    const nuevoEstado = reductorUsuario(
      estadoInicial,
      agregarUsuario(nuevoMensajeConfirmacion)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
