// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('fillFieldAndSubmit', function(){

    cy.get('#firstName').type('Charlles')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('charlles@gmail.com')
    cy.get('#open-text-area').type('Texto qualquer digitado')
    //cy.get('.button[type="submit"]').click
    //cy.contains('button', 'Enviar').click()
    cy.get('.button[type="submit"]').click()
})


Cypress.Commands.add('fillFieldAndSubmitParam', function(nome, sobrenome, email, texto){

    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(texto)
    //Exemplo de uso do comando Contains, que faz a mesma coisa que no exemplo de cima  
   // cy.contains('button', 'Enviar').click()
    cy.get('.button[type="submit"]').click()
})
