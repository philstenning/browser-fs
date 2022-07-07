import data from '../fixtures/fsaDb.json'

export default function resetDb() {
  cy.visit('/provider')
  cy.intercept('testing/fsaDb.data', data)
  cy.get('#request_btn').click()
  cy.wait(300)
  // cy.get('[data-cy="filesForRootDirList"]').should('have.length',1)
  //go to the Test view page.
//   cy.get('[data-test-cy="TestPageLink"]').click()
}
