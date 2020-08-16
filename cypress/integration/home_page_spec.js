describe('Home page', function() {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('has a title', function() {
    cy.visit('http://localhost:3000/');
    cy.get('.title').should('contain', 'Acebook');
  });
});
