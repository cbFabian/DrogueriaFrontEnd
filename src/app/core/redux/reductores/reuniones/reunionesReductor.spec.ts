import { EstadoReunion } from 'app/core/redux/modelo/EstadoReunion';
import { Reunion } from 'app/feature/Reunion/models/Reunion';
import { respuestaAgregado, listarReuniones } from 'app/core/redux/acciones/reunion/ReunionAcciones';
import reductorReunion from './reunionesReductor';

describe('Reductor Reunion', () => {
  it('debería agregar una Reunion', () => {
    // Arrange
    const estadoInicial: EstadoReunion = {
      reuniones: [],
      cantidadTotalReunion: 0,
    };
    const nuevaReunion: Reunion = {
      tipo: 'TIPO_GRANDE',
      precio: 45000,
    };
    const estadoEsperado: EstadoReunion = {
      ...estadoInicial,
      reuniones: [nuevaReunion],
    };

    // Act
    const nuevoEstado = reductorReunion(
      estadoInicial,
      respuestaAgregado(nuevaReunion)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });

  it('debería listar Reuniones', () => {
    // Arrange
    const estadoInicial: EstadoReunion = {
      reuniones: [],
      cantidadTotalReunion: 3,
    };
    const listaReuniones: Reunion[] = [{
          tipo: 'TIPO_PEQUENA',
          precio: 25000
      }, {
          tipo: 'TIPO_MEDIANA',
          precio: 50000
      }, {
          tipo: 'TIPO_GRANDE',
          precio: 75000
      },
    ];
    const estadoEsperado: EstadoReunion = {
      ...estadoInicial,
      reuniones: listaReuniones,
    };

    // Act
    const nuevoEstado = reductorReunion(
      estadoInicial,
      listarReuniones(listaReuniones, listaReuniones.length)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
