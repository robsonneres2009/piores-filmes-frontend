import React from 'react'
import SideMenu from './side-menu'

describe('<SideMenu />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SideMenu />)
  })
})