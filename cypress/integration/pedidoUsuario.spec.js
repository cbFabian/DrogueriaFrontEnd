/// <reference types="cypress" />
'use strict'

describe('Pruebas de Login', () => {
    beforeEach(() => {
        cy.fixture('pedidos.json').as('datosPedido');
        cy.get('@datosPedido').then((datosPedido) =>{
            cy.visit(datosPedido.url);
            cy.contains('h2', 'Inicia de Sesión').should('be.visible');
            cy.get('[name="nombre"]').type(datosPedido.usuario);
            cy.get('[name="clave"]').type(datosPedido.clave);
            cy.contains('button', 'Siguiente').click();
            cy.wait(2000);
            cy.contains('a', '| Ajustes de Cuenta').should('be.visible');
        });
    });

    it('Debe crear un pedido al Usuario', () => {
        cy.contains('a', '| Ir a Pedidos').click();
        cy.wait(2000);
        cy.get('[name="producto"]').select('Nombre: Arroz Chino | Precio: 26000');
        cy.get('[name="reunion"]').select('TIPO_MEDIANA | Precio: 50000');
        cy.get('.react-datepicker__input-container > input').type(' ');
        cy.get('.react-datepicker__day--013').click();
        cy.get('.react-datepicker__time-list-item--selected').click();
        cy.get('[name="direccion"]').type('carrera 80 # 77-44');
        cy.get('[type="number"]').type('5');
        cy.contains('button', 'Hacer Pedido').click();
        cy.contains('h2', 'Su pedido fue creado').should('be.visible');
        cy.wait(2000);
    });

    it('Debe mostrar el pedido realizado del Usuario', () => {
        cy.contains('a', '| Ir a Pedidos').click();
        cy.wait(1500);
    });

    it('Debe modificar un pedido del Usuario', () => {
        cy.contains('a', '| Ir a Pedidos').click();
        cy.wait(2000);
        cy.get('a > .sc-fzqBZW').click();
        cy.get('[name="producto"]').select('Nombre: Arroz Chino | Precio: 26000');
        cy.get('[name="reunion"]').select('TIPO_GRANDE | Precio: 100000');
        cy.get('.react-datepicker__input-container > input').click();
        cy.get('.react-datepicker__day--013').click();
        cy.get('.react-datepicker__time-list-item--selected').click();
        cy.get('[name="direccion"]').type('carrera 80 # 77-44');
        cy.get('[type="number"]').type('5');
        cy.contains('button', 'Modificar Pedido').click();
        cy.contains('h2', 'Su Pedido ha sido modificado con exito').should('be.visible');
        cy.wait(1500);
        cy.contains('button', 'Regresar').click();
    });

    it('Debe cancelar el pedido del Usuario', () => {
        cy.contains('a', '| Ir a Pedidos').click();
        cy.wait(2000);
        cy.get(':nth-child(8) > .sc-fzqBZW').click();
        cy.contains('h2', 'Cancelación Exitosa').should('be.visible');
    });

    it('Debe de generar error al crear pedido un lunes', () => {
        cy.contains('a', '| Ir a Pedidos').click();
        cy.wait(2000);
        cy.get('[name="producto"]').select('Nombre: Bandeja Paisa | Precio: 45000');
        cy.get('[name="reunion"]').select('TIPO_PEQUENA | Precio: 25000');
        cy.get('.react-datepicker__input-container > input').click();
        cy.get('.react-datepicker__day--024').click();
        cy.get('.react-datepicker__time-list-item--selected').click();
        cy.get('[name="direccion"]').type('carrera 80 # 77-44');
        cy.get('[type="number"]').type('5');
        cy.contains('button', 'Hacer Pedido').click();
        cy.contains('h2', 'No se puede agendar pedido para los Lunes').should('be.visible');
    });
});
