import data from '../fixtures/fsaDb.json'
import resetDb from '../custom/resetDb'

before(() => {
  //Reset the Database
  // cy.visit('/')
  // cy.wait(500)
  // cy.intercept('testing/fsaDb.data', data)
  // cy.get('#request_btn').click()
  // //go to the Test view page.
  // cy.get('[data-test-cy="TestPageLink"]').click()
  //Reset the Database
  resetDb()
})

describe(`add default collection if it there is't one already`, () => {
  beforeEach(() => {
    //Reset the Database
    cy.visit('/')

    cy.intercept('testing/fsaDb.data', data)
    cy.get('#request_btn').click()
    //go to the Test view page.
    cy.get('[data-test-cy="TestPageLink"]').click()
  })

  it('add a default collection when a item is selected', () => {
    // select root_1 and add three items
    cy.get('[data-cy="selectRootDir_root_1"]').click()
    cy.get('[data-testid="filesForRootDirListItem-0"]').click()

    cy.get('[data-cy="currentCollection"] > li').should('have.length', 1)
  })

  const w = 0
  it("uses the last used collection if one doesn't  exist", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="addCollectionButton"]').click()
    cy.get('[data-cy="addCollectionButton"]').click()
    cy.get('[data-cy="addCollectionButton"]').click()
    cy.get('[data-cy="selectCollection-1"] > :nth-child(1)').click()
    cy.get('[data-cy="deleteCollection-1"]').click()
    cy.get('[data-testid="filesForRootDirListItem-1"]').click()
    cy.get('[data-cy="selectCollection-0"] > :nth-child(1)').click()
    cy.get('[data-cy="currentCollection"] > li').should('have.length', 1)
    /* ==== End Cypress Studio ==== */
  })
})

export {}
