/// <reference types="cypress" />


describe("window open", function () {


    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit("http://localhost:6007/");
    });

  it("opens a new window with page1", function () {
  

    cy.get('[data-testid="collectionList_btnAdd"]').click();
    cy.wait(2000)
    // cy.get('[data-testid="collectionListItem-0_btnDelete"]').click();

  });
});


export {}
