/* ==== Test Created with Cypress Studio ==== */

beforeEach(() => {
  cy.fixture("../../public/testing/fsaDb.data").then((blob) => {
    cy.visit("/");
    cy.intercept("testing/fsaDb.data", blob);
    cy.get("#request_btn").click();
    cy.wait(500);
  });
});

it("files are removed from collections when root directories are deleted", function () {
  cy.get('[data-test-cy="TestPageLink"]').click();
  cy.get('[data-cy="selectRootDir_root_1"]').click();

  cy.get("#colName").clear();
  cy.get("#colName").type("test");
  cy.get('[data-testid="collectionList_btnAdd"]').click();


  cy.get('[data-cy="selectRootDir_root_1"]').click();
  // cy.get('[data-testid="filesForRootDirListItem-0"]').click();
  // cy.get('[data-testid="filesForRootDirListItem-2"]').click();
  // cy.get('[data-testid="filesForRootDirListItem-4"]').click();
  // cy.get('[data-testid="currentCollectionItemsList"] > li').should(
  //   "have.length",
  //   3
  // );
  // cy.get('[data-cy="selectRootDir_root_2"]').click();
  // cy.get('[data-testid="filesForRootDirListItem-5"]').click();
  // cy.get('[data-testid="filesForRootDirListItem-6"]').click();
  // cy.get('[data-testid="filesForRootDirListItem-7"]').click();
  // cy.get('[data-testid="currentCollectionItemsList"] > li').should(
  //   "have.length",
  //   6
  // );
  // cy.get('[data-cy="selectRootDir_root_3"]').click();
  // cy.get('[data-testid="filesForRootDirListItem-0"]').click();
  // cy.get('[data-cy="deleteRootDir_root_3"]').click();
  // cy.get('[data-cy="deleteRootDir_root_2"]').click();
  // cy.get('[data-cy="deleteRootDir_root_1"]').click();
  // cy.get('[data-cy="currentCollection"] > li').should("have.length", 10);
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-testid="filesForRootDirListItem-0"]').click();
  cy.get('[data-testid="filesForRootDirListItem-2"]').click();
  cy.get('[data-testid="filesForRootDirListItem-4"]').click();
  cy.get('[data-cy="selectRootDir_root_2"]').click();
  cy.get('[data-testid="filesForRootDirListItem-6"]').click();
  cy.get('[data-testid="filesForRootDirListItem-7"]').click();
  cy.get('[data-testid="filesForRootDirListItem-8"]').click();
  cy.get('[data-testid="rootDirectories"] > ul > :nth-child(3)').click();
  cy.get('[data-testid="filesForRootDirListItem-0"]').click();
  /* ==== End Cypress Studio ==== */
});

export {};
