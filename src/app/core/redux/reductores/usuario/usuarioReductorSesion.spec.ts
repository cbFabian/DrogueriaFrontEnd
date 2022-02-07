import { EstadoUsuario } from 'app/core/redux/modelo/EstadoUsuario';
import { Usuario } from 'app/feature/Usuario/models/Usuario';
import { agregarSesionUsuario } from 'app/core/redux/acciones/usuario/UsuarioAcciones';
import reductorUsuario from './usuarioReductor';

describe('Reductor usuario', () => {
  it('debería agregar sesion de usuario creado', () => {
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
    const datosUsuarioSesion: Usuario = {nombre: 'Prueba1', clave: '1234'};
    const estadoEsperado: EstadoUsuario = {
      ...estadoInicial,
        usuarios: [...estadoInicial.usuarios, datosUsuarioSesion],
        mostrarPanel: true,
        mostrarAgregar: false,
        mostrarInicio: false,
        mensajeConfirmacion: `Bienvenid@ ${datosUsuarioSesion.nombre}, inicio de Sesión correcto!!`,
        mensajeError: '',
    };

    // Act
    const nuevoEstado = reductorUsuario(
      estadoInicial,
      agregarSesionUsuario(datosUsuarioSesion)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
