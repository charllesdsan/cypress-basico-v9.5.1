// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')   
  })


  it('preencher os campos e enviar formulario', function(){
        const longText = "teste teste teste teste teste testeteste teste testeteste teste testeteste testeteste teste testeteste teste testeteste teste testeteste teste testeteste teste testeteste teste testeteste teste testeteste teste teste"
        
        cy.get('#firstName').type('Charlles')
        cy.wait(1000) //especie de delay
        cy.get('#lastName').type('Santana')
        cy.wait(1000)
        cy.get('#email').type('charlles@gmail.com')
        cy.wait(1000)
        cy.get('#open-text-area').type(longText)
        cy.wait(1000)
        cy.get('.button[type="submit"]').click()


        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
       
        cy.get('#firstName').type('Charlles')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('charlles@')
        cy.get('#open-text-area').type('estou começando a gostar disso!!!')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
     })


    it('campo telefone inalterado quando preenchido com valores não numéricos', function() {
      
      cy.get('#phone').type('hbfhjbfhabfhab').should('have.value', '')
    })
     
    it.skip('exibe mensagem de erro quando o telefone se torna obrigatório mas não for preenchido antes do envio do formulário', function() {
      
      cy.get('#firstName').type('Charlles')
      cy.get('#lastName').type('Santana')
      cy.get('#email').type('charlles@gmail.com')
      cy.get('#phone-checkbox').check
      cy.get('#open-text-area').type('estou começando a gostar disso!!!')
      //cy.get('.button[type="submit"]').click
      cy.get('.button').click()

      cy.get('.error').should('be.visible')
    })

    it('teste de limpar campos', function(){
      cy.get('#firstName')
         .type('Charlles')
         .should('have.value', 'Charlles').clear
    })
    
    it('enviar formulario sem preencher campos obrigatórios', function(){
      
      //cy.get('.button[type="submit"]').click
      cy.get('.button').click()
      cy.get('.error').should('be.visible')
    })



    it('testando minha primeira funcao', function(){

      cy.fillFieldAndSubmit()
      cy.get('.success').should('be.visible')
    })
   
    it.skip('testando minha primeira funcao com passagem de parametro', function(){

      cy.fillFieldAndSubmitParam('Joao Bosco','Bento de Santana','bosco@itriad', 'Muito bacana!')
      cy.get('.success').should('be.visible')
    })



    it('seleciona um produto', function(){

      //Selecionando pelo texto
      cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')

      //Selecionando pelo seu value html 
      cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')

      //Selecionando pelo seu indice
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })


    it('marca o tipo de atendimento Feedback', function(){
     
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    
    it('marca cada tipo de atendimento', function(){
     
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })

    })



  //Seção 6.  Marcando e desmarcando inputs do tipo chackbox
  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })


  //Seção 8 - links que abrem em outras abas.
  it('clicando em elemento href', function(){
      //cy.get('a').click()  
      //cy.get('#privacy a')
      cy.get('a[href="privacy.html"]').contains('Política de Privacidade').click()
      //cy.get('a[target="_blank"]').contains('Política de Privacidade').click()
      //cy.get('a[href="privacy.html"]').contains('Política de Privacidade').click()
      //cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')  //neste caso verifica, mas não abri outra aba
   })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    /*
      O cypress somente controla a sua aba no navegador. Qualquer outro link ele não consegue atuar.
      Por isso, o comando abaixo remove o atributo target blank (responsavel para abrir em outra aba)
      permitindo assim o link ser aberto na mesma aba que o cypress está ativo.
    */
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  
  
})
