describe('Sign Up', function(){

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('can let a new user sign up', function(){
     cy.task('emptyUsers');
     cy.visit('http://localhost:3000/user/new')

     cy.get('#firstName').type('Helen');
     cy.get('#lastName').type('Smith');
     cy.get('#Email').type('helensmith@gmail.com');
     cy.get('#password-id').type('123456');
     cy.get('#password-id2').type('123456');
     cy.get('#createUser').click()
     cy.get('#createdUserMessage').should('contain', 'Thanks for signing up! Please click here to login');
  });

  it('requires user to fill in their email', function(){
    cy.visit('/user/new')

    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#password-id').type('123456');
    cy.get('#createUser').click()
    cy.url().should('eq', 'http://localhost:3000/user/new')
  });

  it('requires user to fill in their first name', function(){
    cy.visit('/user/new')

    cy.get('#lastName').type('Smith');
    cy.get('#Email').type('helensmith@gmail.com');
    cy.get('#password-id').type('123456');
    cy.get('#createUser').click()
    cy.url().should('eq', 'http://localhost:3000/user/new')
  });

  it('requires user to fill in their last name', function(){
    cy.visit('/user/new')

    cy.get('#firstName').type('Helen');
    cy.get('#Email').type('helensmith@gmail.com');
    cy.get('#password-id').type('123456');
    cy.get('#createUser').click()
    cy.url().should('eq', 'http://localhost:3000/user/new')
  });

  it('requires user to fill in their password', function(){
    cy.visit('/user/new')

    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#Email').type('helensmith@gmail.com');
    cy.get('#createUser').click()
    cy.url().should('eq', 'http://localhost:3000/user/new')
  });

  it('requires user to fill in their password with over 6 characters', function(){
    cy.visit('/user/new')

    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#Email').type('helensmith@gmail.com');
    cy.get('#password-id').type('1234');
    cy.get('#password-id2').type('1234');
    cy.get('#createUser').click()
    cy.get('#password-error').should('contain', 'Passwords must be a minimum of 6 characters. Try again');
  });

  it('requires user to use a unique email', function(){
    cy.visit('/user/new')

    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#Email').type('example@example.com');
    cy.get('#password-id').type('123456');
    cy.get('#password-id2').type('123456');
    cy.get('#createUser').click()
    cy.get('#email-error').should('contain', 'Sorry this username already exists, please click here to login');
  });

  it('user can see password', function(){
    cy.visit('/user/new')
    cy.get('#password-id').type('123456');
    cy.get('#password-id2').type('123');
    cy.get('#checkbox').type("checkbox").check()
    cy.get('#password-id').should('have.value', '123456');
    cy.get('#password-id2').should('have.value', '123');
  });

});
