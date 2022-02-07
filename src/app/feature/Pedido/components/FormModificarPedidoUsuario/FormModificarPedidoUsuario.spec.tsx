import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormModificarPedidoUsuario } from '.';
import { setTextEvent } from 'app/shared/utils/test';
import { constantes } from 'app/shared/utils/constantes';
import { BrowserRouter as Router } from "react-router-dom"

const {
  POSICION_DOS,
  POSICION_TRES,
  POSICION_CUATRO,
  NUMERO_DOS,
  NUMERO_TRES,
  NUMERO_CINCO,
} = constantes;

describe('FormModificarPedidoUsuario test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof FormModificarPedidoUsuario> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      formTitle: 'Form test',
      onSubmit: stub(),
      productos: [{
              nombre: 'Paella Española',
              precio: 38000,
              detalle: 'Verduras y sustituye'
          }
        ],
      usuarios:[{nombre: 'Lorem', clave: '1234'}],
      reuniones:[{
              tipo: 'TIPO_PEQUENA',
              precio: 25000
          }, {
              tipo: 'TIPO_MEDIANA',
              precio: 50000
          }, {
              tipo: 'TIPO_GRANDE',
              precio: 75000
          }
        ],
        pedidoListar: {id: 4,
          nombreUsuario: 'Lorem',
          nombreProducto: 'Paella Española',
          tipoReunion: 'TIPO_PEQUENA',
          fechaRealizacion: 'January 4, 2022 3:00 PM',
          direccion: 'calle 10 # 30-40',
          horasDeServicio: 4,
          valorTotal: 63000,},
          mensajeModificar: '',
          mensajeExcepcion: '',
          esFestivo: false,
    };
    componentWrapper = render(<Router><FormModificarPedidoUsuario {...componentProps} /></Router>);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should fail on submit all fields missing', async () => {
    const elem = componentWrapper.container;
    const horasDeServicio = elem.querySelector('input[name="horasDeServicio"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        horasDeServicio && fireEvent.change(horasDeServicio, setTextEvent('horasDeServicio', ''));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(NUMERO_CINCO);
    expect(spans[0].textContent).toBe('El Producto es requerido.');
    expect(spans[1].textContent).toBe('La Reunion es requerida.');
    expect(spans[POSICION_DOS].textContent).toBe('El campo Direccion es requerido.');
    expect(spans[POSICION_TRES].textContent).toBe('El campo Horas de Servicio es requerido.');
    expect(spans[POSICION_CUATRO].textContent).toBe('El valor del pedido no puede ser 0');
  });

  it('should fail on submit five fields missing', async () => {
    const elem = componentWrapper.container;
    const producto = elem.querySelector('select[name="producto"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
          \\"precio\\":\\"38000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(NUMERO_TRES);
    expect(spans[0].textContent).toBe('La Reunion es requerida.');
    expect(spans[1].textContent).toBe('El campo Direccion es requerido.');
    expect(spans[POSICION_DOS].textContent).toBe('Minimo 4 horas');
  });

  it('should fail on submit two fields missing', async () => {
    const elem = componentWrapper.container;

    const producto = elem.querySelector('select[name="producto"]');
    const reunion = elem.querySelector('select[name="reunion"]');
    const fechaRealizacion = elem.querySelector('input[name="fechaRealizacion"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
          \\"precio\\":\\"38000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
    });
    await wait(() => {
        reunion && fireEvent.change(reunion, setTextEvent('reunion', `"{\\"tipo\\":\\"TIPO_PEQUENA\\",\\"precio\\":25000}"`));
    });
    await wait(() => {
        fechaRealizacion && fireEvent.change(fechaRealizacion, setTextEvent('fechaRealizacion', 'January 4, 2022 3:00 PM'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(NUMERO_DOS);
    expect(spans[0].textContent).toBe('El campo Direccion es requerido.');
    expect(spans[1].textContent).toBe('Minimo 4 horas');
  });

  it('should fail on submit one fields missing', async () => {
    const elem = componentWrapper.container;

    const producto = elem.querySelector('select[name="producto"]');
    const reunion = elem.querySelector('select[name="reunion"]');
    const fechaRealizacion = elem.querySelector('input[name="fechaRealizacion"]');
    const direccion = elem.querySelector('input[name="direccion"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
          \\"precio\\":\\"38000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
    });
    await wait(() => {
        reunion && fireEvent.change(reunion, setTextEvent('reunion', `"{\\"tipo\\":\\"TIPO_PEQUENA\\",\\"precio\\":25000}"`));
    });
    await wait(() => {
        fechaRealizacion && fireEvent.change(fechaRealizacion, setTextEvent('fechaRealizacion', 'January 4, 2022 3:00 PM'));
    });
    await wait(() => {
        direccion && fireEvent.change(direccion, setTextEvent('direccion', 'calle 10 # 30-40'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe('Minimo 4 horas');
  });
});
