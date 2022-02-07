import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormCrearReunion } from './';
import { setTextEvent } from 'app/shared/utils/test';

describe('FormCrearReunion test', () => {
    let componentWrapper: RenderResult;
    let componentProps: React.ComponentProps<typeof FormCrearReunion> & {
        onSubmit: SinonStub;
    };

    beforeEach(() => {
        componentProps = {
          formTitle: 'Form test',
          onSubmit: stub(),
        };
        componentWrapper = render(<FormCrearReunion {...componentProps} />);
    });

    it('should match snapshot', () => {
        expect(componentWrapper.container).toMatchSnapshot();
    });

    it('should fail on submit all fields missing', async () => {
        const elem = componentWrapper.container;
        const submitButton = elem.querySelector('button[type="submit"]');
        const DOS = 2;

        await wait(() => {
          submitButton && fireEvent.click(submitButton);
        });
        const spans = elem.querySelectorAll('span');
        expect(spans.length).toBe(DOS);
        expect(spans[0].textContent).toBe('El campo tipo es requerido.');
        expect(spans[1].textContent).toBe('El campo precio es requerido.');
      });
    
      it('should fail on submit one field missing', async () => {
        const elem = componentWrapper.container;
    
        const tipo = elem.querySelector('input[name="tipo"]');
        const submitButton = elem.querySelector('button[type="submit"]');
    
        await wait(() => {
          tipo && fireEvent.change(tipo, setTextEvent('tipo', 'Lorem'));
        });
    
        await wait(() => {
          submitButton && fireEvent.click(submitButton);
        });
        const spans = elem.querySelectorAll('span');
        expect(spans.length).toBe(1);
        expect(spans[0].textContent).toBe('El campo precio es requerido.');
      });
    
      it('should submit', async () => {
        const elem = componentWrapper.container;
        const VEINTI4MIL = 24000;

        const tipo = elem.querySelector('input[name="tipo"]');
        const precio = elem.querySelector('input[name="precio"]');
        const submitButton = elem.querySelector('button[type="submit"]');
    
        await wait(() => {
            tipo && fireEvent.change(tipo, setTextEvent('tipo', 'Lorem'));
        });
        await wait(() => {
            precio && fireEvent.change(precio, setTextEvent('precio', '24000'));
        });
        await wait(() => {
          submitButton && fireEvent.click(submitButton);
        });
    
        const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    
        expect(formSubmitted.tipo).toBe('Lorem');
        expect(formSubmitted.precio).toBe(VEINTI4MIL);
      });
});
