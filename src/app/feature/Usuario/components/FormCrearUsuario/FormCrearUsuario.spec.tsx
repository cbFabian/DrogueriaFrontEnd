import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormCrearUsuario } from '.';
import { setTextEvent } from 'app/shared/utils/test';

const DOS = 2;
const TRES = 3;

describe('FormCrearUsuario test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof FormCrearUsuario> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      formTitle: 'Form test',
      onSubmit: stub(),
      irInicioSesion: stub(),
      mensajeErrorCreacion: '',
    };
    componentWrapper = render(<FormCrearUsuario {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should fail on submit all fields missing', async () => {
    const elem = componentWrapper.container;
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(TRES);
    expect(spans[0].textContent).toBe('El campo nombre es requerido.');
    expect(spans[1].textContent).toBe('El campo clave es requerido.');
    expect(spans[DOS].textContent).toBe('El campo de confirmar clave es requerido.');
  });

  it('should fail on submit two fields missing', async () => {
    const elem = componentWrapper.container;
    const nombre = elem.querySelector('input[name="nombre"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      nombre && fireEvent.change(nombre, setTextEvent('nombre', 'Lorem'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(DOS);
    expect(spans[0].textContent).toBe('El campo clave es requerido.');
    expect(spans[1].textContent).toBe('El campo de confirmar clave es requerido.');
  });

  it('should fail on submit two fields missing', async () => {
    const elem = componentWrapper.container;

    const nombre = elem.querySelector('input[name="nombre"]');
    const clave = elem.querySelector('input[name="clave"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      nombre && fireEvent.change(nombre, setTextEvent('nombre', 'Lorem'));
    });
    await wait(() => {
      clave && fireEvent.change(clave, setTextEvent('clave', '1234'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe('El campo de confirmar clave es requerido.');
  });

  it('should submit', async () => {
    const elem = componentWrapper.container;

    const nombre = elem.querySelector('input[name="nombre"]');
    const clave = elem.querySelector('input[name="clave"]');
    const confirmarClave = elem.querySelector('input[name="confirmarClave"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      nombre && fireEvent.change(nombre, setTextEvent('nombre', 'Lorem'));
    });
    await wait(() => {
      clave && fireEvent.change(clave, setTextEvent('clave', '1234'));
    });
    await wait(() => {
      confirmarClave && fireEvent.change(confirmarClave, setTextEvent('confirmarClave', '1234'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    const formSubmitted = componentProps.onSubmit.firstCall.args[0];

    expect(formSubmitted.nombre).toBe('Lorem');
    expect(formSubmitted.clave).toBe('1234');
  });
});
