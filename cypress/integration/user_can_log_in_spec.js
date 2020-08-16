describe('Log In', function(){

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('can let a user login', function(){
     cy.visit('/user/login')

     cy.get('#email').type('example@example.com');
     cy.get('#password-id').type('123456');
     cy.get('#login').click()

  });
});
