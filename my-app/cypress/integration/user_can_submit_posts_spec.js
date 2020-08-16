
describe('Timeline', function() {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('can submit posts and view them', function() {

    cy.visit('/user/login');
    cy.get('#email').type('example@example.com');
    cy.get('#password-id').type('123456');
    cy.get('#login').click()

    cy.url().should('eq', 'http://localhost:3000/posts/5ee39eaecfe82d9ef285e148')

    cy.get('#new-post-text-area').type(`John's first post`);
    cy.get('#new-post-submit').click();

    cy.get('#posts').should('contain', `John's first post`);
  });

//   Cypress.on('uncaught:exception', (err, runnable) => {
//     console.log("err :" + err)
//     console.log("runnable :" + runnable)
//     return false
// })
});
