import data from '../fixtures/fsaDb.json'

export default function resetDb() {
  cy.visit('/provider')
  cy.intercept('testing/fsaDb.data', data)
  cy.get('#request_btn').click()
  //go to the Test view page.
//   cy.get('[data-test-cy="TestPageLink"]').click()
cy.wait(300)
}
