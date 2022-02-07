/// <reference types="cypress" />
'use strict'

describe('Pruebas de Login', () => {

    beforeEach(() => {
        cy.fixture('usuario.json').as('datosUsuario');
        cy.visit(`http://localhost:3001/usuario`);
        cy.contains('h2', 'Inicia de Sesión').should('be.visible');
    });

    it('Debe registar un Usuario', () => {
        cy.get('@datosUsuario').then((datosUsuario) =>{
            cy.get('.sc-fznKkj').click();
            cy.get('[name="nombre"]').type(datosUsuario.usuario);
            cy.get('[name="clave"]').type(datosUsuario.clave);
            cy.get('[name="confirmarClave"]').type(datosUsuario.clave);
            cy.contains('button', 'Registrar').click();
            cy.wait(2000);
            cy.get('.sc-fzoLag').should('not.exist');
        });
    });

    it('Debe iniciar sesión el Usuario', () => {
        cy.get('@datosUsuario').then((datosUsuario) =>{
            cy.get('[name="nombre"]').type(datosUsuario.usuario);
            cy.get('[name="clave"]').type(datosUsuario.clave);
            cy.contains('button', 'Siguiente').click();
            cy.wait(2000);
            cy.contains('a', '| Ajustes de Cuenta').should('be.visible');
        });
    });

    it('Debe fallar con un Usuario erroneo', () => {
        cy.get('@datosUsuario').then((datosUsuario) =>{
            cy.get('[name="nombre"]').type(datosUsuario.usuario_erroneo);
            cy.get('[name="clave"]').type(datosUsuario.clave);
            cy.contains('button', 'Siguiente').click();
            cy.wait(2000);
            cy.contains('h2', 'Error de Credenciales o Usuario no Existe').should('be.visible');
        });
    });

    it('Debe de ingresar a ajustes y cambiar la contraseña de Usuario', () => {
        cy.get('@datosUsuario').then((datosUsuario) =>{
            cy.get('[name="nombre"]').type(datosUsuario.usuario);
            cy.get('[name="clave"]').type(datosUsuario.clave);
            cy.contains('button', 'Siguiente').click();
            cy.wait(2000);
            cy.contains('a', '| Ajustes de Cuenta').should('be.visible');
            cy.contains('a', '| Ajustes de Cuenta').click();
            cy.get('[name="claveActual"]').type(datosUsuario.clave);
            cy.get('[name="claveNueva"]').type(datosUsuario.claveNueva);
            cy.get('[name="confirmarclaveNueva"]').type(datosUsuario.claveNueva);
            cy.wait(2000);
            cy.contains('button', 'Actualizar').click();
            cy.contains('h2', 'Se ha Actualizado su Clave, Inicie Sesión').should('be.visible');
        });
    });

    it('Debe ingresar a ajustes y dar de Baja al Usuario', () => {
        cy.get('@datosUsuario').then((datosUsuario) =>{
            cy.get('[name="nombre"]').type(datosUsuario.usuario);
            cy.get('[name="clave"]').type(datosUsuario.claveNueva);
            cy.contains('button', 'Siguiente').click();
            cy.wait(2000);
            cy.contains('a', '| Ajustes de Cuenta').should('be.visible');
            cy.contains('a', '| Ajustes de Cuenta').click();
            cy.get('[href="/"] > .sc-fzoiQi').click();
            cy.wait(2000);
        });
    });
});
