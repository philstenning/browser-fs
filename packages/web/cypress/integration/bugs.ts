import data from "../fixtures/fsaDb.json";

describe("Issues", () => {
  beforeEach(() => {
    //Reset the Database
    cy.visit("/");
    cy.intercept("testing/fsaDb.data", data);
    cy.get("#request_btn").click();
    //go to the Test view page.
    cy.get('[data-test-cy="TestPageLink"]').click();
  });

  it("should fix #91 - permission on handles should be false.", () => {
    cy.get('[data-cy="rootDirHasPermission-0"]').should("have.text", "❌");
    cy.get('[data-cy="rootDirHasPermission-1"]').should("have.text", "❌");
    cy.get('[data-cy="rootDirHasPermission-2"]').should("have.text", "❌");
  });
});

export {};
