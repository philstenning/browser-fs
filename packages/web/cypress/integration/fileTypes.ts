/* ==== Test Created with Cypress Studio ==== */
import resetDb from '../custom/resetDb'

describe('FileType Tests',()=>{




beforeEach(() => {
  //Reset the Database
  resetDb()
});

it("should remove files with type from dB when clicking the delete button for file type", function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-cy="selectRootDir_root_1"]').click();
  cy.get('[data-testid="fileTypes_remove_stl"] > button').click();
  cy.get('[data-cy="filesForRootDirList"] > li').should('have.length',6);
  cy.get('[data-testid="fileTypes_remove_3mf"] > button').click();
  cy.get('[data-cy="filesForRootDirList"] > li').should('have.length',3);
  cy.get('[data-testid="fileTypes_remove_gcode"] > button').click();
  cy.get('[data-cy="filesForRootDirList"] > li').should('have.length',0);
  cy.get('[data-testid="fileTypes_addStl"]').click();
  cy.get('[data-testid="fileTypes_add3mf"]').click();
  cy.get('[data-testid="fileTypes_addGcode"]').click();
  cy.get('[data-cy="filesForRootDirList"] > li').should('have.length',0);
  /* ==== End Cypress Studio ==== */
});
})
export {};
