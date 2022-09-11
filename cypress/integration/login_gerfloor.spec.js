
describe('Login gerfloor', function() {


  it('apiLogin', function() {

    cy.request('POST', 'https://sisw-dev.gertec.com.br:8080/api/Auth/login', {
        login: "charlles",
        password: "Acesso@001",
        idCurrentBranch: '3',
        }).then((response) => {
          expect(response).property('status').to.equal(200)
          cy.writeFile('cypress/fixtures/loginResponseBody.json', response.body)
        })
  })



  it('getLogin', function() {

    let szIdProfile
    let szUsername
    let szToken
    let szIdCurrentBranch
  
    cy.readFile('cypress/fixtures/loginResponseBody.json').its('idProfile').then((idProfile) => { szIdProfile = idProfile }) 
    cy.readFile('cypress/fixtures/loginResponseBody.json').its('login').then((userName) => { szUsername = userName}) 
    cy.readFile('cypress/fixtures/loginResponseBody.json').its('token').then((token) => { szToken = token }) 
    cy.readFile('cypress/fixtures/loginResponseBody.json').its('idCurrentBranch').then((idCurrentBranch) => { szIdCurrentBranch = idCurrentBranch}) 
  
    cy.visit('https://sisw-dev.gertec.com.br/login', {
      onBeforeLoad:  (browser) => {
        browser.localStorage.setItem('idProfile', szIdProfile);
        browser.localStorage.setItem('username', szUsername);
        browser.localStorage.setItem('token', szToken);
        browser.localStorage.setItem('idCurrentBranch', szIdCurrentBranch);
      }
    });

  })
  

})
