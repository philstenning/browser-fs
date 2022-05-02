/* ==== Test Created with Cypress Studio ==== */

import data from "../fixtures/fsaDb.json";

describe("Files Tests", () => {
  beforeEach(() => {
    //Reset the Database
    cy.visit("/");
    cy.intercept("testing/fsaDb.data", data);
    cy.get("#request_btn").click();
    //go to the Test view page.
    cy.get('[data-test-cy="TestPageLink"]').click();
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("should have no collection id when removed from  a collection", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="selectRootDir_root_1"]').click();
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    /* ==== End Cypress Studio ==== */
  });
  
  /* ==== Test Created with Cypress Studio ==== */
  it("should have id when added to collection", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[test-cy="selectedFile"]  > li')
    .first()
    .should("have.text", "body.3mf");
    
    cy.get('[data-cy="filesCollections"]').should('have.text', "0")

    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="filesCollections"]').should('have.text', "1")

    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="filesCollections"]').should('have.text', "2")

    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="filesCollections"]').should('have.text', "3")

  
  });
});
export {};
