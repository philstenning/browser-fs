import React from 'react'
import TestComponent from './testComponent'

describe('<TestComponent>', () => {
  it('mount', () => {
    cy.mount(<TestComponent />)
  })
})
