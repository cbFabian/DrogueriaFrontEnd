import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormCrearPedidoUsuario } from '.';
import { constantes } from 'app/shared/utils/constantes';
import { setTextEvent } from 'app/shared/utils/test';

const {
  HORAS24,
  HORA15,
  MINUTOS60,
  SEGUNDOS60,
  MILISEGUNDOS,
  HORAMINIMA,
} = constantes;

const fechaDeHoy: Date = new Date();
const fechaDiaSiguiente: Date = new Date(fechaDeHoy.getTime() +  (HORAS24 * MINUTOS60 * SEGUNDOS60 * MILISEGUNDOS));
const SESENTAY5MIL = 65000;

describe('FormCrearPedidoUsuarioSubmit test', () => {
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
        esFestivo: false,
    };
    componentWrapper = render(<FormCrearPedidoUsuario {...componentProps} />);
  });

  it('should submit on crear pedidos', async () => {
    const elem = componentWrapper.container;

    const producto = elem.querySelector('select[name="producto"]');
    const reunion = elem.querySelector('select[name="reunion"]');
    const fechaRealizacion = elem.querySelector('input[name="fechaRealizacion"]');
    const direccion = elem.querySelector('input[name="direccion"]');
    const horasDeServicio = elem.querySelector('input[name="horasDeServicio"]');
    const valorTotalPedido = elem.querySelector('label[name="valorTotalPedido"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    const fechaComparar = new Date(fechaDiaSiguiente.setHours(HORA15,0,0))
    .toISOString();

    await wait(() => {
        producto && fireEvent.change(producto, setTextEvent('producto', `"{\\"nombre\\":\\"Paella Española\\",
          \\"precio\\":\\"40000\\",\\"detalle\\":\\"Verduras y sustituye\\"}"`));
    });
    await wait(() => {
        reunion && fireEvent.change(reunion, setTextEvent('reunion', `"{\\"tipo\\":\\"TIPO_PEQUENA\\",\\"precio\\":25000}"`));
    });
    await wait(() => {
        fechaRealizacion && fireEvent.change(fechaRealizacion, setTextEvent('fechaRealizacion', fechaComparar));
    });
    await wait(() => {
        direccion && fireEvent.change(direccion, setTextEvent('direccion', 'calle 10 # 30-40'));
    });
    await wait(() => {
        horasDeServicio && fireEvent.change(horasDeServicio, setTextEvent('horasDeServicio', '4'));
    });
    await wait(() => {
        valorTotalPedido && fireEvent.change(valorTotalPedido, setTextEvent('valorTotalPedido', '65000'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    const formSubmitted = componentProps.onSubmit.firstCall.args[0];

    expect(formSubmitted.usuario).toStrictEqual({nombre: 'Lorem', clave: '1234'});
    expect(formSubmitted.producto).toStrictEqual({
        nombre: 'Paella Española',
        precio: 40000,
        detalle: 'Verduras y sustituye'
    });
    expect(formSubmitted.reunion).toStrictEqual({
        tipo: 'TIPO_PEQUENA',
        precio: 25000
    });
    expect(formSubmitted.fechaRealizacion).toBe(new Date(fechaComparar)
    .toISOString());
    expect(formSubmitted.direccion).toBe('calle 10 # 30-40');
    expect(parseInt(formSubmitted.valorTotal, 10)).toBe(SESENTAY5MIL);
    expect(parseInt(formSubmitted.horasDeServicio, 10)).toBe(HORAMINIMA);
  });
});
