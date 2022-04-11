

describe("My First Test", () => {
  // it("Does not do much!", () => {
  //   cy.visit('/')
  //   cy.get(`[data-cy="btn-select"]`).click();
  //   // expect(true).to.equal(true);
  // });

  /* ==== Test Created with Cypress Studio ==== */
  it('click button', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:6007/');
    cy.get('[data-cy="btn-select"]').click();
  
    /* ==== End Cypress Studio ==== */
  });
});


export {}