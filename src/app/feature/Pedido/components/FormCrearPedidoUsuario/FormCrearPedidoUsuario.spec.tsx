import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormCrearPedidoUsuario } from '.';
import { setTextEvent } from 'app/shared/utils/test';

const NUMERO_DOS = 2;


describe('FormCrearPedidoUsuario test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof FormCrearPedidoUsuario> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      formTitle: 'Form test',
      onSubmit: stub(),
      validarDiaFestivo: stub(),
      productos: [{
                nombre: 'Paella Española',
                precio: 40000,
                detalle: 'Verduras y sustituye'
            }
        ],
      usuarioPedido: {nombre: 'Lorem', clave: '1234'},
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
        mensajePedido: '',
        mensajeExcepcion: '',
        esFestivo: false,
    };
    componentWrapper = render(<FormCrearPedidoUsuario {...componentProps} />);
  });

  it('should match snapshot of crear pedidos', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should fail on submit two fields missing on crear pedidos', async () => {
    const elem = componentWrapper.container;
    const horasDeServicio = elem.querySelector('input[name="horasDeServicio"]');
    const producto = elem.querySelector('input[name="producto"]');
    const reunion = elem.querySelector('input[name="reunion"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        horasDeServicio && fireEvent.change(horasDeServicio, setTextEvent('horasDeServicio', ''));
    });
    await wait(() => {
      producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
        \\"precio\\":\\"40000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
    });
    await wait(() => {
      reunion && fireEvent.change(reunion, setTextEvent('reunion', `"{\\"tipo\\":\\"TIPO_PEQUENA\\",\\"precio\\":25000}"`));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');

    expect(spans.length).toBe(NUMERO_DOS);
    expect(spans[0].textContent).toBe('El campo Direccion es requerido.');
    expect(spans[1].textContent).toBe('El campo Horas de Servicio es requerido.');
  });

  it('should fail on submit two fields missing on crear pedidos', async () => {
    const elem = componentWrapper.container;
    const producto = elem.querySelector('select[name="producto"]');
    const reunion = elem.querySelector('select[name="reunion"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
          \\"precio\\":\\"40000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
    });
    await wait(() => {
      reunion && fireEvent.change(reunion, setTextEvent('reunion', `"{\\"tipo\\":\\"TIPO_PEQUENA\\",\\"precio\\":25000}"`));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(NUMERO_DOS);
    expect(spans[0].textContent).toBe('El campo Direccion es requerido.');
    expect(spans[1].textContent).toBe('Minimo 4 horas');
  });

  it('should fail on submit two fields missing on crear pedidos', async () => {
    const elem = componentWrapper.container;

    const producto = elem.querySelector('select[name="producto"]');
    const reunion = elem.querySelector('select[name="reunion"]');
    const fechaRealizacion = elem.querySelector('input[name="fechaRealizacion"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
          \\"precio\\":\\"40000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
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

  it('should fail on submit one fields missing on crear pedidos', async () => {
    const elem = componentWrapper.container;

    const producto = elem.querySelector('select[name="producto"]');
    const reunion = elem.querySelector('select[name="reunion"]');
    const fechaRealizacion = elem.querySelector('input[name="fechaRealizacion"]');
    const direccion = elem.querySelector('input[name="direccion"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
        producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
          \\"precio\\":\\"40000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
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
