// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('foo', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:6007/');
  cy.get('[data-testid="0"]').click();
  cy.get('#colName').clear();
  cy.get('#colName').type('padding');
  cy.get('form > button').click();
  cy.get('[data-testid="1"]').click();
  cy.get('[data-testid="2"]').click();
  cy.get('[data-testid="3"]').click();
  cy.get('[data-testid="4"]').click();
  cy.get('[data-testid="4"]').click();
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('._active_1o0y4_1 > ._btnGroup_1o0y4_33 > :nth-child(4)').click();
  cy.get(':nth-child(1) > ._btnGroup_1o0y4_33 > :nth-child(1)').click();
  /* ==== End Cypress Studio ==== */
});
