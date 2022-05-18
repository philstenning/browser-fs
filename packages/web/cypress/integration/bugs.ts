// import data from "../fixtures/fsaDb.json";
import resetDb from '../custom/resetDb'

describe("Issues", () => {
  beforeEach(() => {
    //Reset the Database
   resetDb()
   
  });

  it("should fix #91 - permission on handles should be false.", () => {
    cy.get('[data-cy="rootDirHasPermission-0"]').should("have.text", "❌");
    cy.get('[data-cy="rootDirHasPermission-1"]').should("have.text", "❌");
    cy.get('[data-cy="rootDirHasPermission-2"]').should("have.text", "❌");
  });
});

export {};

