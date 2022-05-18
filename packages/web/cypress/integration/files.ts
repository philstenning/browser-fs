/* ==== Test Created with Cypress Studio ==== */
import resetDb from '../custom/resetDb'

describe("Files Tests", () => {
  beforeEach(() => {
    //Reset the Database
    resetDb()
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
    cy.log(`creates a default collection as there is not one already.`) 
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[test-cy="selectedFile"]  > li')
    .first()
    .should("have.text", "body.3mf");
    
    cy.get('[data-cy="filesCollections"]').should('have.text', "1")

    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="filesCollections"]').should('have.text', "2")

    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="filesCollections"]').should('have.text', "3")

    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-cy="filesCollections"]').should('have.text', "4")

  
  });
});
export {};
